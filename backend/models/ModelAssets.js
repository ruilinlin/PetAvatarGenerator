// 引入 mongoose 用于创建数据模型
const mongoose = require('mongoose');

// 创建 Schema（数据结构）
const AssetSchema = new mongoose.Schema({
  // 标题字段：字符串类型
  title: String,
  
  // 类型字段：必填，只能是 'image' 或 'video'
  type: {
    type: String,
    enum: ['image', 'video'],  // 枚举值，限制可选值
    required: true            // 设为必填项
  },
  
  // 资源URL：存储图片或视频的链接
  url: {
    type: String,
    required: true
  },
  // 缩略图URL：用于视频的预览图
  thumbnail: String,
  
  // 创建时间：自动设置为当前时间
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 导出模型，供其他文件使用
module.exports = mongoose.model('Asset', AssetSchema);