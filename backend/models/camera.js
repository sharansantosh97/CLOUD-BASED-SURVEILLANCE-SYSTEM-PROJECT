const mongoose = require('mongoose');

const cameraSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  buildingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Building',
  },
  cameraType: {
    type: String
  },
  resolution: {
    type: String
  },
  location: {
    type: [Number],
    required: true
  },
  operationStatus: {
    type: String,
    required: true
  },
  healthStatus: {
    type: String,
    required: true
  },
  alerts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alert'
  }]
});

const Camera = mongoose.model('Camera', cameraSchema);

module.exports = Camera;
