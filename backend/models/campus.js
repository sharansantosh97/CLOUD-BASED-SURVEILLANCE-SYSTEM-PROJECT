const mongoose = require('mongoose');

const campusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  buildings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Building'
  }]
});

const Campus = mongoose.model('Campus', campusSchema);

module.exports = Campus;
