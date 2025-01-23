const Asset = require('../models/ModelAssets');

const assetController = {
  // 获取资源列表
  getAssets: async (req, res) => {
    try {
      const { page = 1, limit = 20, type, search } = req.query;
      
      let query = {};
      if (type) query.type = type;
      if (search) {
        query.title = { $regex: search, $options: 'i' };
      }

      const assets = await Asset.find(query)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });

      const total = await Asset.countDocuments(query);

      res.json({
        assets,
        total,
        pages: Math.ceil(total / limit)
      });
    } catch (error) {
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
  }
};

module.exports = assetController;
