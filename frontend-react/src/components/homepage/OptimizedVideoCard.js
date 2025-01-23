import React from 'react';
import { useOptimizedVideo } from '../../hooks/useOptimizedVideo';

const OptimizedVideoCard = ({ videoId }) => {
  const { videoUrl, quality } = useOptimizedVideo(videoId);

  return (
    <div className="video-card">
      <video 
        controls
        preload="metadata"
        className="video-player"
        poster={`${videoUrl}?thumb=1`}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="quality-indicator">
        Currently playing in {quality}
      </div>
    </div>
  );
};

export default OptimizedVideoCard; 