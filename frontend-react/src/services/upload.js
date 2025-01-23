import axios from 'axios';

export const uploadMedia = async (file) => {
  if (file.type.includes('image')) {
    return await uploadToCloudinary(file);
  } else if (file.type.includes('video')) {
    return await uploadToBunny(file);
  }
};

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'your_preset_name');
  
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`,
      formData
    );
    
    return response.data.secure_url;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};

const uploadToBunny = async (file) => {
  // 1. 首先上传原始视频
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(
    `https://${process.env.REACT_APP_BUNNY_STORAGE_ZONE}.storage.bunnycdn.com/videos`,
    formData,
    {
      headers: {
        'AccessKey': process.env.REACT_APP_BUNNY_API_KEY,
        'Content-Type': 'multipart/form-data'
      }
    }
  );

  // 2. 触发转码任务
  await axios.post(
    `https://video.bunnycdn.com/library/${process.env.REACT_APP_BUNNY_LIBRARY_ID}/videos`,
    {
      title: file.name,
      collectionId: "homepage-videos",
      // 转码设置
      encode: {
        // 生成多个清晰度版本
        quality: ["720p", "480p", "360p"],
        // 使用自适应比特率
        enableAdaptiveBitrate: true
      }
    },
    {
      headers: {
        'AccessKey': process.env.REACT_APP_BUNNY_API_KEY
      }
    }
  );

  return response.data.url;
}; 