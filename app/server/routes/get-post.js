const Post = require('../models/Post');

module.exports = async (req, res) => {
    // Get id from the request body
    const postId = req.params.id;

    console.log("POST /get-post")

    try {
        // Get the posts
        let post = await Post.findById(postId)

        // If empty, throw an error
        if (!post) {
            throw { status: 404, error: 'Post not found' };
        }   
        else {
            // Return a success message
            res.status(200).json({ success: true, post: post });
        }
    }
    catch (error) {
        console.error('Error getting post:', error);
        // Check if error is an object with status and error properties
        if (error.status && error.error) {
            return res.status(error.status).json({ error: error.error });
        }
        else {
            return res.status(500).json({ error: 'Failed to get post' });
        }
    }
}
