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
    type: String // DSLR / Mirrorless / Compact
  },
  resolution: {
    type: String // 4K / 1080p / 720p
  },
  location: {
    type: [Number], // lat, long
    required: true
  },
  timeframes: {
    type: String // 30s , 60s
  },
  dataStorage: {
    type: String // Local / Cloud
  },
  operationStatus: {
    type: String,
    required: true,
    default: 'Online'
  },
  healthStatus: {
    type: String,
    required: true,
    default: 'Active'
  },
  alerts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alert',
  }]
});

const Camera = mongoose.model('Camera', cameraSchema);

module.exports = Camera;
