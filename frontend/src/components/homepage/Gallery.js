import React from 'react';
import styles from './Gallery.module.css';
import VideoCard from './VideoCard';
import ImageCard from './ImageCard';

const Gallery = ({ assets = [] }) => {
  return (
    <div className={styles.gallery}>
      {assets.map(asset => (
        asset.type === 'image' ? (
          <ImageCard 
            key={asset._id}
            imageUrl={asset.url}
            // title={asset.title}
          />
        ) : (
          <VideoCard
            key={asset._id}
            videoUrl={asset.url}
            // title={asset.title}
          />
        )
      ))}
    </div>
  );
};

export default Gallery; 