const Post = require('../models/Post');

module.exports = async (req, res) => {
    // Get start and end from the request body
    const { start, end } = req.body;

    console.log("POST /get-posts")

    try {
        // Get the posts
        let posts = await Post.find({}).sort({ timestamp: -1 }).skip(start).limit(end - start);

        // If empty, return empty array
        if (!posts) {
            return res.status(200).json({ success: true, posts: [] });
        }
        else {
            // Return a success message
            res.status(200).json({ success: true, posts: posts });
        }
    }
    catch (error) {
        console.error('Error getting posts:', error);
        // Check if error is an object with status and error properties
        if (error.status && error.error) {
            return res.status(error.status).json({ error: error.error });
        }
        else {
            return res.status(500).json({ error: 'Failed to get posts' });
        }
    }
}
