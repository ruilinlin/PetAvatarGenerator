import React from 'react';
import { useState , useCallback , useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import VideoCard from './VideoCard';
import ImageCard from './ImageCard';
import styles from './Gallery.module.css';  // 使用 CSS Modules
import dynamic from 'next/dynamic';
import axios from 'axios';


const Gallery = ({ initialAssets = [] }) => {
  // 添加调试日志
  console.log('Gallery props:', { initialAssets });
  // 示例数据，后面会从数据库获取
  const demoAssets = [
    {
      id: 1,
      type: 'image',
      url: '/images/aby-01.png',  // 存放在 public/images 目录
      title: 'Demo Image 1'
    },
    {
      id: 2,
      type: 'video',
      url: '/videos/aby-01.mp4',  // 存放在 public/videos 目录
      title: 'Demo Video 1'
    }
  ];
  // 使用示例数据或从后端获取的数据
  const assets = initialAssets.length > 0 ? initialAssets : demoAssets;

  const InfiniteScroll = dynamic(() => import('react-infinite-scroll-component'), { ssr: false });
  // const [assets, setAssets] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // const fetchAssets = useCallback(async () => {
  //   if (loading) return;
    
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(`/api/assets`, {
  //       params: {
  //         page,
  //         limit: 20,
  //       }
  //     });

  //     const { assets: newAssets, pages } = response.data;
      
  //     setAssets(prev => [...prev, ...newAssets]);
  //     setHasMore(page < pages);
  //   } catch (error) {
  //     console.error('Error fetching assets:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [page, loading]);

  // useEffect(() => {
  //   fetchAssets();
  // }, [fetchAssets]);

  // const loadMore = () => {
  //   if (!loading && hasMore) {
  //     setPage(prev => prev + 1);
  //   }
  // };

//   return (
//     <div className="gallery-container">
//       <InfiniteScroll
//         dataLength={assets.length}
//         next={loadMore}
//         hasMore={hasMore}
//         loader={
//           <div className="loading-spinner">
//             Loading...
//           </div>
//         }
//         endMessage={
//           <p style={{ textAlign: 'center' }}>
//             No more items to load.
//           </p>
//         }
//       >
//         <div className="gallery-grid">
//           {assets.map(asset => (
//             asset.type === 'video' ? (
//               <VideoCard
//                 key={asset.id}
//                 videoUrl={asset.url}
//                 thumbnail={asset.thumbnail}
//                 title={asset.title}
//               />
//             ) : (
//               <ImageCard
//                 key={asset.id}
//                 imageUrl={asset.url}
//                 title={asset.title}
//               />
//             )
//           ))}
//         </div>
//       </InfiniteScroll>
//     </div>
//   );
// };
return (
  <div className={styles.galleryGrid}>
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
);
};

export default Gallery; 