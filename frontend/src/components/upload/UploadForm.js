// 前端：处理用户交互和文件选择
const UploadForm = () => {
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', file.name);
    
    try {
      // 调用后端 API
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      // 处理响应...
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };
}; 