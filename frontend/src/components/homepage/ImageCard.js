import React from 'react';
import styles from './ImageCard.module.css';

const ImageCard = ({ imageUrl, title }) => {
  // 确保 URL 以 .png 结尾
  const fullImageUrl = imageUrl.endsWith('.png') ? imageUrl : `${imageUrl}.png`;
  console.log('Image URL:', fullImageUrl);
  
  return (
    <div className={styles.imageCard}>
      <img
        src={fullImageUrl}
        alt={title}
        className={styles.image}
        width={300}
        height={200}
        style={{ objectFit: 'cover' }}
      />
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
};

export default ImageCard; 