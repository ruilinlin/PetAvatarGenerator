const axios = require('axios');

async function initializeGallery() {
  try {
    // 检查初始化状态
    const statusRes = await axios.get('http://localhost:5000/api/init/status');
    
    if (statusRes.data.initialized) {
      console.log('Gallery already initialized with', statusRes.data.assetCount, 'assets');
      return;
    }

    // 执行初始化
    const initRes = await axios.post('http://localhost:5000/api/init/gallery');
    console.log('Gallery initialization result:', initRes.data);
  } catch (error) {
    console.error('Initialization failed:', error.message);
  }
}

// 执行初始化
initializeGallery(); 