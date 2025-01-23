import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import VideoCard from './VideoCard';
import ImageCard from './ImageCard';
import './Gallery.css';

const Gallery = () => {
  const [assets, setAssets] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchAssets = useCallback(async () => {
    if (loading) return;
    
    try {
      setLoading(true);
      const response = await axios.get(`/api/assets`, {
        params: {
          page,
          limit: 20,
        }
      });

      const { assets: newAssets, pages } = response.data;
      
      setAssets(prev => [...prev, ...newAssets]);
      setHasMore(page < pages);
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="gallery-container">
      <InfiniteScroll
        dataLength={assets.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div className="loading-spinner">
            Loading...
          </div>
        }
        endMessage={
          <p style={{ textAlign: 'center' }}>
            No more items to load.
          </p>
        }
      >
        <div className="gallery-grid">
          {assets.map(asset => (
            asset.type === 'video' ? (
              <VideoCard
                key={asset.id}
                videoUrl={asset.url}
                thumbnail={asset.thumbnail}
                title={asset.title}
              />
            ) : (
              <ImageCard
                key={asset.id}
                imageUrl={asset.url}
                title={asset.title}
              />
            )
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Gallery; 