const express = require('express');
const router = express.Router();
const initController = require('../controllers/initController');

// 初始化画廊
router.post('/gallery', initController.initializeGallery);

// 获取初始化状态
router.get('/status', initController.getInitStatus);

module.exports = router; 