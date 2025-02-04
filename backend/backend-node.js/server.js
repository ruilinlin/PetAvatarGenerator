// 导入必要的模块
const express = require('express');     // Web 应用框架
const mongoose = require('mongoose');    // MongoDB 数据库工具
const cors = require('cors');           // 跨域资源共享中间件
const assetsRouter = require('./routes/assets');  // 导入资源路由处理器
const initRouter = require('./routes/init');

// 创建 Express 应用实例
const app = express();

// 配置中间件
app.use(cors());           // 启用 CORS，允许跨域请求
app.use(express.json());   // 解析 JSON 格式的请求体

// 连接 MongoDB 数据库
mongoose.connect('mongodb://localhost:27017/gallery')
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// 监听数据库连接事件
mongoose.connection.on('connected', () => {
  console.log('🟢 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('🔴 Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🟡 Mongoose disconnected');
});

// 设置路由
app.use('/api/assets', assetsRouter);  // 所有 /api/assets 的请求都交给 assetsRouter 处理

// 添加初始化路由（建议添加权限控制）
app.use('/api/init', initRouter);

// 添加测试路由（可选，用于检查服务器状态）
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend is working!',
    mongoStatus: mongoose.connection.readyState // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
  });
});

// 添加数据库状态检查路由
app.get('/api/status', (req, res) => {
  res.json({
    server: 'running',
    mongodb: {
      status: mongoose.connection.readyState,
      statusText: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState]
    }
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// 设置服务器端口
const PORT = process.env.PORT || 5000;

// 启动服务器
app.listen(PORT, (error) => {
  if (error) {
    console.error('❌ Error starting server:', error);
    return;
  }
  console.log(`🚀 Server running on port ${PORT}`);
}).on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please try a different port.`);
  } else {
    console.error('❌ Server error:', error);
  }
});