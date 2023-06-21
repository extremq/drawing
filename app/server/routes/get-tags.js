const Tag = require('../models/Tag');
const AdminLog = require('../models/AdminLog');
const config = require('../config');

// Check token route
module.exports = async (req, res) => {
    // Get the token from the request body
    const { token } = req.body;

    console.log("POST /get-tags")

    try {
        // Log the access attempt
        const newLog = new AdminLog({
            ip: req.ip,
            action: `Attempting to get tags ${token}`,
            browser: req.headers['user-agent'],
        });

        await newLog.save();

        // Check if the token is valid
        if (token !== config.admin_token) {
            throw new Error({status: 401, error: 'Unauthorized'});
        }

        let tags = await Tag.find({});

        // If the token is valid, return a success message
        res.status(200).json({ success: true, tags: tags });
    } catch (error) {
        console.error('Error getting tags:', error);
        // Check if error is an object with status and error properties
        if (error.status && error.error) {
            return res.status(error.status).json({ error: error.error });
        }
        else {
            return res.status(500).json({ error: 'Failed to get tags' });
        }
    }
}