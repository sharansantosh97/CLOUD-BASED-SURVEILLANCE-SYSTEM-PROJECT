const mongoose = require('mongoose');
const Building = require('./building');
const Camera = require('./camera');

const videoDataSchema = new mongoose.Schema({
  // videoDataId: {
  //   type: Number,
  //   required: true,
  //   unique: true
  // },
  cameraId: {
    type: Number,
    ref: 'Camera',
    required: true
  },
  buildingId: {
    type: Number,
    ref: 'Building',
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  videoLink: {
    type: String,
    required: true
  }
});

const VideoData = mongoose.model('VideoData', videoDataSchema);

module.exports = VideoData;
