import React from 'react';
import './VideoCard.css';

const VideoCard = ({ videoUrl, thumbnail, title }) => {
  console.log('Video URL:', videoUrl);
  
  return (
    <div className="video-card">
      <video 
        controls
        preload="metadata"
        className="video-player"
        poster={thumbnail}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h3>{title}</h3>
    </div>
  );
};

export default VideoCard; 