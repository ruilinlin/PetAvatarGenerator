import React from 'react';
import styles from './VideoCard.module.css';

const VideoCard = ({ videoUrl, title }) => {
  console.log('Video URL:', videoUrl);
  
  return (
    <div className={styles.videoCard}>
      <video
        className={styles.video}
        controls
        preload="metadata"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
};

export default VideoCard; 