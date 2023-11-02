const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    device: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    priority:{
        type:String,
        required: true
    },
    location:{
        type:String,
        required: true
    },
    resolved:{
        type:Boolean,
        required: false
    },
    userId: [{
        type: String,
        ref: 'User'
      }]
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;