const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
        minlength: 1,
    }
});

module.exports = Comment = mongoose.model('comment', CommentSchema);