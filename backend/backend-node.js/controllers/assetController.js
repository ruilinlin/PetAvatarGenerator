const Asset = require('../models/ModelAssets');
const fs = require('fs');
const path = require('path');

const assetController = {
  // 获取资源列表
  getAssets: async (req, res) => {
    try {
      console.log('Fetching assets with query:', req.query);
      const { page = 1, limit = 20, type, search } = req.query;
      
      let query = {};
      if (type) query.type = type;
      if (search) {
        query.title = { $regex: search, $options: 'i' };
      }

      console.log('MongoDB query:', query);

      const assets = await Asset.find(query)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });

      console.log('Found assets:', assets.length);

      const total = await Asset.countDocuments(query);
      
      const response = {
        assets,
        total,
        pages: Math.ceil(total / limit)
      };
      
      console.log('Sending response:', JSON.stringify(response, null, 2));
      res.json(response);
    } catch (error) {
      console.error('Error in getAssets:', error);
      res.status(500).json({ message: error.message });
    }
  },

  // 获取单个资源
  getAssetById: async (req, res) => {
    try {
      const asset = await Asset.findById(req.params.id);
      if (!asset) {
        return res.status(404).json({ message: 'Asset not found' });
      }
      res.json(asset);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // 创建新资源
  createAsset: async (req, res) => {
    try {
      const newAsset = new Asset(req.body);
      const savedAsset = await newAsset.save();
      res.status(201).json(savedAsset);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // 更新资源
  updateAsset: async (req, res) => {
    try {
      const updatedAsset = await Asset.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedAsset) {
        return res.status(404).json({ message: 'Asset not found' });
      }
      res.json(updatedAsset);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // 删除资源
  deleteAsset: async (req, res) => {
    try {
      const deletedAsset = await Asset.findByIdAndDelete(req.params.id);
      if (!deletedAsset) {
        return res.status(404).json({ message: 'Asset not found' });
      }
      res.json({ message: 'Asset deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // 上传资源
  uploadAsset: async (req, res) => {
    try {
      const { title, type, url } = req.body;
      
      // 验证必要字段
      if (!title || !type || !url) {
        return res.status(400).json({ 
          message: 'Missing required fields: title, type, and url are required' 
        });
      }

      // 验证资源类型
      if (!['image', 'video'].includes(type)) {
        return res.status(400).json({ 
          message: 'Invalid asset type. Must be either "image" or "video"' 
        });
      }

      const newAsset = new Asset({
        title,
        type,
        url,
        metadata: req.body.metadata || {}
      });

      const savedAsset = await newAsset.save();
      res.status(201).json(savedAsset);
    } catch (error) {
      console.error('Error in uploadAsset:', error);
      res.status(500).json({ message: error.message });
    }
  },

  // 初始化测试数据
  initializeTestData: async (req, res) => {
    try {
      // 获取初始化前的数量
      const beforeCount = await Asset.countDocuments();
      console.log(`数据库初始化前的资源数量: ${beforeCount}`);

      // 清空现有数据
      await Asset.deleteMany({});
      console.log('已清空现有数据');

      const publicPath = path.join(__dirname, '../../frontend/public');
      const imagesDir = path.join(publicPath, 'images');
      const videosDir = path.join(publicPath, 'videos');

      // 确保目录存在
      if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
      if (!fs.existsSync(videosDir)) fs.mkdirSync(videosDir, { recursive: true });

      // 读取目录中的文件
      const imageFiles = fs.readdirSync(imagesDir)
        .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
      const videoFiles = fs.readdirSync(videosDir)
        .filter(file => /\.(mp4|webm|mov)$/i.test(file));

      console.log(`找到 ${imageFiles.length} 个图片文件`);
      console.log(`找到 ${videoFiles.length} 个视频文件`);

      const assets = [];

      // 处理图片文件
      for (const file of imageFiles) {
        const extension = path.extname(file).toLowerCase().slice(1);
        assets.push({
          title: path.basename(file, path.extname(file)),
          type: 'image',
          url: `/images/${file}`,
          metadata: {
            format: extension,
            size: 'auto', // 这里可以添加获取实际图片尺寸的逻辑
            dimensions: {
              width: 800,  // 默认值，可以添加获取实际尺寸的逻辑
              height: 600
            }
          }
        });
      }

      // 处理视频文件
      for (const file of videoFiles) {
        const extension = path.extname(file).toLowerCase().slice(1);
        assets.push({
          title: path.basename(file, path.extname(file)),
          type: 'video',
          url: `/videos/${file}`,
          metadata: {
            format: extension,
            size: 'auto',
            duration: 'auto', // 这里可以添加获取实际视频时长的逻辑
            dimensions: {
              width: 1920,  // 默认值，可以添加获取实际尺寸的逻辑
              height: 1080
            }
          }
        });
      }

      if (assets.length === 0) {
        return res.status(404).json({ 
          message: 'No media files found in public directories. Please add some images to frontend/public/images or videos to frontend/public/videos' 
        });
      }

      const savedAssets = await Asset.insertMany(assets);
      const afterCount = await Asset.countDocuments();
      
      console.log(`数据库初始化后的资源数量: ${afterCount}`);
      console.log('成功写入的资源详情:', savedAssets.map(asset => ({
        title: asset.title,
        type: asset.type,
        url: asset.url
      })));

      res.json({ 
        message: 'Assets initialized successfully', 
        count: savedAssets.length,
        totalInDb: afterCount,
        assets: savedAssets 
      });
    } catch (error) {
      console.error('Error initializing assets:', error);
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = assetController;

