import { useState, useEffect } from 'react';

export const useOptimizedVideo = (videoId) => {
  const [videoQuality, setVideoQuality] = useState('auto');
  const [connection, setConnection] = useState('4g');

  useEffect(() => {
    // 检测网络状况
    if ('connection' in navigator) {
      setConnection(navigator.connection.effectiveType);
    }

    // 根据网络状况选择清晰度
    switch(connection) {
      case '4g':
        setVideoQuality('720p');
        break;
      case '3g':
        setVideoQuality('480p');
        break;
      default:
        setVideoQuality('360p');
    }
  }, [connection]);

  return {
    videoUrl: `https://${process.env.REACT_APP_BUNNY_PULL_ZONE}.b-cdn.net/${videoId}/${videoQuality}.mp4`,
    quality: videoQuality
  };
}; 