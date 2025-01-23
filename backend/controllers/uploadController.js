// 后端：处理文件存储和数据库操作
const uploadController = {
  async upload(req, res) {
    try {
      const file = req.files.file;
      const fileType = file.mimetype.includes('video') ? 'video' : 'image';
      
      // 1. 生成唯一文件名
      const fileName = `${Date.now()}-${file.name}`;
      const publicPath = `/public/${fileType}s/${fileName}`;
      
      // 2. 保存文件
      await file.mv(publicPath);
      
      // 3. 保存到数据库
      const asset = new Asset({
        type: fileType,
        title: req.body.title,
        url: `/static/${fileType}s/${fileName}`,  // 公开访问路径
        createdAt: new Date()
      });
      
      await asset.save();
      
      res.json({ success: true, asset });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}; 