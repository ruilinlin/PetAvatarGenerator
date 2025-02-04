const InitialAsset = require('../models/InitialAsset');
const Asset = require('../models/ModelAssets');
const path = require('path');
const fs = require('fs').promises;

// 处理后端初始化操作
const initController = {
  // 初始化画廊数据
  initializeGallery: async (req, res) => {
    try {
      // 先检查是否已经初始化
      const existingAssets = await InitialAsset.find({ isShowcase: true });
      if (existingAssets.length > 0) {
        return res.json({
          success: true,
          message: 'Gallery already initialized',
          assets: existingAssets
        });
      }

      const assetsConfig = [
        {
          type: 'image',
          directory: path.join(__dirname, '../../public/images'),
          urlPrefix: '/assets/gallery/images',
          category: 'homepage'
        },
        {
          type: 'video',
          directory: path.join(__dirname, '../../public/videos'),
          urlPrefix: '/assets/gallery/videos',
          category: 'homepage'
        }
      ];

      let initializedAssets = [];

      for (const config of assetsConfig) {
        // 读取目录中的所有文件
        const files = await fs.readdir(config.directory);
        
        for (const [index, file] of files.entries()) {
          // 创建初始化资源记录
          const initialAsset = new InitialAsset({
            type: config.type,
            title: path.parse(file).name,
            url: `${config.urlPrefix}/${file}`,
            displayOrder: index,
            category: config.category
          });

          // 同时创建普通资源记录
          const asset = new Asset({
            type: config.type,
            title: path.parse(file).name, // 使用文件名作为标题
            url: `${config.urlPrefix}/${file}`,
            status: 'active'
          });

          await Promise.all([
            initialAsset.save(),
            asset.save()
          ]);

          initializedAssets.push(initialAsset);
        }
      }

      res.json({
        success: true,
        message: 'Gallery initialized successfully',
        assets: initializedAssets
      });
    } catch (error) {
      console.error('Gallery initialization error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to initialize gallery',
        error: error.message
      });
    }
  },

  // 获取初始化状态
  getInitStatus: async (req, res) => {
    try {
      const count = await Asset.countDocuments();
      res.json({
        initialized: count > 0,
        assetCount: count
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = initController; 