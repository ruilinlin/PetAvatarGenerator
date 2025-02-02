const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');

// 初始化测试数据路由 - 必须放在 /:id 路由之前
router.get('/init', assetController.initializeTestData);
router.post('/init', assetController.initializeTestData);

// 上传路由
router.post('/upload', assetController.uploadAsset);

// CRUD 路由
router.get('/', assetController.getAssets);
router.get('/:id', assetController.getAssetById);
router.put('/:id', assetController.updateAsset);
router.delete('/:id', assetController.deleteAsset);

module.exports = router; 