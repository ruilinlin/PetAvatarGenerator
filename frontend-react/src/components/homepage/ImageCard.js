import React from 'react';
import './ImageCard.css';

const ImageCard = ({ imageUrl, title }) => {
  console.log('Image URL:', imageUrl); // 添加调试日志
  
  return (
    <div className="image-card">
      <img src={imageUrl} alt={title} className="gallery-image" />
      <h3>{title}</h3>
    </div>
  );
};

export default ImageCard; 