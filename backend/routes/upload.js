// 后端代码
const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// 配置 Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // 验证用户权限
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // 验证文件
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // 上传到 Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'pet-avatars',
      resource_type: 'auto'
    });

    // 返回图片 URL
    res.json({
      imageUrl: result.secure_url,
      publicId: result.public_id
    });
  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router; 