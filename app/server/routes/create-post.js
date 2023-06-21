// Load the Post model
const Post = require('../models/Post');
const AdminLog = require('../models/AdminLog');
const config = require('../config');
const Tag = require('../models/Tag');

module.exports = async (req, res) => {
    // Get the post details from the request body
    const caption = req.body.caption;
    const image = req.file;
    const tags = JSON.parse(req.body.tags);
    const token = req.body.token;

    console.log(tags)

    console.log("POST /create-post")

    try {
        // Log the access attempt
        const newLog = new AdminLog({
            ip: req.ip,
            action: `Attempting to post with token ${token}`,
            browser: req.headers['user-agent'],
        });

        await newLog.save();

        // Check if the post details are valid
        if (!image || (!tags.selectedTags && !tags.newTags) || !token) {
            throw new Error({status: 400, error: 'Please enter all fields'});
        }

        // Check if image is webp
        if (image.mimetype !== 'image/webp') {
            throw new Error({status: 400, error: 'Please upload a webp image'});
        }

        // Check if the token is valid
        if (token !== config.admin_token) {
            throw new Error({status: 401, error: 'Unauthorized'});
        }

        let validTags = []

        // Increment the tag counts
        let selectedTags = tags.selectedTags;
        for (let i = 0; i < selectedTags.length; i++) {
            let name = selectedTags[i];

            // Check if tag exists
            let tag = await Tag.findOne({ name: name });
            if (tag) {
                // Increment the tag
                await Tag.findOneAndUpdate({ name: name }, { $inc: { count: 1 } });

                validTags.push(name);
                continue;
            }
        }

        // Create the new tags
        let newTags = tags.newTags;
        for (let i = 0; i < newTags.length; i++) {
            let name = newTags[i];

            // Check if tag exists
            let tag = await Tag.findOne({ name: name });
            if (tag) {
                // Increment the tag
                await Tag.findOneAndUpdate({ name: name }, { $inc: { count: 1 } });

                validTags.push(name);
                continue;
            }

            // Create the tag
            tag = new Tag({
                name: name,
                count: 1,
            });

            await tag.save();

            validTags.push(tag.name);
        }

        // Create a new post with the details
        const newPost = new Post({
            image: image.buffer,
            caption: caption,
            tags: validTags,
        });

        // Save the post to the database
        await newPost.save();

        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error('Error creating post:', error);
        // Check if error is an object with status and error properties
        if (error.status && error.error) {
            return res.status(error.status).json({ error: error.error });
        }
        else {
            return res.status(500).json({ error: 'Failed to create post' });
        }
    }
}