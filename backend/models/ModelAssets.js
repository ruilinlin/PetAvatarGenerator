// 引入 mongoose 用于创建数据模型
const mongoose = require('mongoose');

// 创建 Schema（数据结构）
const AssetSchema = new mongoose.Schema({
  // 基本信息
  title: {
    type: String,
    required: true,
    trim: true
  },
  
  // 类型字段：必填，只能是 'image' 或 'video'
  type: {
    type: String,
    enum: ['image', 'video'],  // 枚举值，限制可选值
    required: true            // 设为必填项
  },
  
  // 资源路径
  url: {
    type: String,
    required: true
  },
  
  // 元数据
  metadata: {
    size: String,           // 改为 String 类型
    format: String,         // 文件格式
    duration: String,       // 视频时长，改为 String
    dimensions: {           // 尺寸信息
      width: Number,
      height: Number
    }
  },
  
  // 状态信息
  status: {
    type: String,
    enum: ['active', 'archived', 'deleted'],
    default: 'active'
  },
  
  // 缩略图URL：用于视频的预览图
  thumbnail: String,
  
  // 时间戳
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// 更新时间戳中间件
AssetSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// 导出模型，供其他文件使用
module.exports = mongoose.model('Asset', AssetSchema);