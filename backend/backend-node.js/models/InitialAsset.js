const mongoose = require('mongoose');

const InitialAssetSchema = new mongoose.Schema({
  // 基本信息
  title: {
    type: String,
    required: true
  },
  
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true
  },
  
  // 资源路径
  url: {
    type: String,
    required: true
  },
  
  // 展示相关
  displayOrder: {
    type: Number,
    default: 0
  },
  
  // 初始化信息
  initializedAt: {
    type: Date,
    default: Date.now
  },
  
  // 是否为展示用资源
  isShowcase: {
    type: Boolean,
    default: true
  },
  
  // 分类（首页展示、案例展示等）
  category: {
    type: String,
    enum: ['homepage', 'showcase', 'demo'],
    default: 'homepage'
  }
});

module.exports = mongoose.model('InitialAsset', InitialAssetSchema); 