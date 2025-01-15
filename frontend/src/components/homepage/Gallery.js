import React from 'react';
import { galleryAssets } from '../../config/galleryAssets';
import VideoCard from './VideoCard';
import ImageCard from './ImageCard';
import './Gallery.css';

const Gallery = () => {
  console.log('Gallery assets:', galleryAssets);
  
  return (
    <div className="gallery-container">
      <section className="video-showcase">
        {galleryAssets.videos.map(video => (
          <VideoCard
            key={video.id}
            videoUrl={video.url}
            thumbnail={video.thumbnail}
            title={video.title}
          />
        ))}
      </section>
      
      <section className="image-showcase">
        {galleryAssets.images.map(image => (
          <ImageCard
            key={image.id}
            imageUrl={image.url}
            title={image.title}
          />
        ))}
      </section>
    </div>
  );
};

export default Gallery; 