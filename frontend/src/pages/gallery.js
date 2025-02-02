import Gallery from '../components/homepage/Gallery';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

// 使用 SSG
export async function getStaticProps() {
  try {
    const res = await fetch('http://localhost:5000/api/assets');
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

export async function getServerSideProps({ query }) {
  const { page = 1, limit = 20, type } = query;
  
  try {
    const res = await fetch(
      `http://localhost:5000/api/assets?page=${page}&limit=${limit}${type ? `&type=${type}` : ''}`
    );
    const data = await res.json();

    return {
      props: {
        assets: data.assets,
        pagination: {
          total: data.total,
          pages: data.pages,
          currentPage: parseInt(page)
        }
      }
    };
  } catch (error) {
    return {
      props: {
        assets: [],
        error: 'Failed to load gallery'
      }
    };
  }
}

export default function GalleryPage({ assets, pagination }) {
  return (
    <div>
      <Header />
      <div className="main-content">
        <SideBar />
        <Gallery assets={assets} />
      </div>
    </div>
  );
} 