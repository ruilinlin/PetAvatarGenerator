// 前端代码
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    const response = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.imageUrl;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
}; 