const mongoose = require('mongoose');
const CommentSchema = require('./Comment').schema;

const PostSchema = new mongoose.Schema({
    image: {
        type: Buffer,
        required: true,
    },
    caption: {
        type: String,
        default: "No caption",
        required: true,
    },
    tags: {
        type: [String],
        default: [],
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true,
    },
    comments: {
        type: [CommentSchema],
        default: [],
        required: true,
    },
});

module.exports = Post = mongoose.model('post', PostSchema);