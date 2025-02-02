import React from 'react';
import styles from './Gallery.module.css';

const VideoCard = ({ videoUrl, title }) => {
  return (
    <div className={styles.videoCard}>
      <video 
        src={videoUrl}
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
      />
      {/* <div className={styles.videoTitle}>{title}</div> */}
    </div>
  );
};

export default VideoCard; 