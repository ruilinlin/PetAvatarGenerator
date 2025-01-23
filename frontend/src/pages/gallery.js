import Gallery from '../components/homepage/Gallery';

// 使用 SSG
export async function getStaticProps() {
  try {
    const res = await fetch('http://localhost:5001/api/assets');
    const data = await res.json();

    return {
      props: {
        initialAssets: data.assets
      },
      revalidate: 60  // ISR: 每60秒重新生成
    };
  } catch (error) {
    return {
      props: {
        initialAssets: []
      },
      revalidate: 60
    };
  }
}

export default function GalleryPage({ initialAssets }) {
  return <Gallery initialAssets={initialAssets} />;
} 