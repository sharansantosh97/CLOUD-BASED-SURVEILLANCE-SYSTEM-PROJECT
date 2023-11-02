const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    cameraId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Camera',
        required: true
    },
    type: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    imageUrl: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        required: true
    }

});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;