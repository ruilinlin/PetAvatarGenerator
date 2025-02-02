import React from 'react';
import styles from './Gallery.module.css';

const ImageCard = ({ imageUrl, title }) => {
  return (
    <div className={styles.imageCard}>
      <img 
        src={imageUrl} 
        alt={title}
        className={styles.image}
        loading="lazy"
      />
      {/* <div className={styles.imageTitle}>{title}</div> */}
    </div>
  );
};

export default ImageCard; 