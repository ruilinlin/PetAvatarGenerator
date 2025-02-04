const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['image', 'video']
  },
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Asset', assetSchema); 