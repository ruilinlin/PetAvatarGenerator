const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
  title: String,
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true
  },
  url: String,
  thumbnail: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Asset', AssetSchema);