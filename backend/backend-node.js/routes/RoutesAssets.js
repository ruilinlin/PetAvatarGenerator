const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');

// 资源路由
router.get('/', assetController.getAssets);
router.get('/:id', assetController.getAssetById);
router.post('/', assetController.createAsset);
router.put('/:id', assetController.updateAsset);
router.delete('/:id', assetController.deleteAsset);

module.exports = router;