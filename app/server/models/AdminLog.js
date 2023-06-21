const mongoose = require('mongoose');

const AdminLogSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
    browser: {
        type: String,
        required: true,
    },
});

module.exports = AdminLog = mongoose.model('adminlog', AdminLogSchema);