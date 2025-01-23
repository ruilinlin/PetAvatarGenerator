import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import SideBar from '../components/homepage/SideBar';
import Header from '../components/homepage/Header';
import Gallery from '../components/homepage/Gallery';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 使用 getStaticProps 获取 Gallery 数据
export async function getStaticProps() {
  try {
    const galleryRes = await fetch('http://localhost:5001/api/assets');
    const galleryData = await galleryRes.json();

    // 确保数据是有效的
    const validAssets = galleryData.assets?.map(asset => ({
      id: asset.id || null,
      title: asset.title || '',
      type: asset.type || 'image',
      url: asset.url || '',
      thumbnail: asset.thumbnail || ''
    })) || [];

    return {
      props: {
        initialAssets: validAssets
      },
      revalidate: 60
    };
  } catch (error) {
    console.error('Error fetching assets:', error);
    return {
      props: {
        initialAssets: []
      },
      revalidate: 60
    };
  }
}

// 主页组件
export default function Home({ initialAssets = [] }) {
  return (
    <>
      <Head>
        <title>Gallery App</title>
        <meta name="description" content="Gallery application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`app-container ${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <div className="main-content">
        <SideBar />
          <Gallery initialAssets={initialAssets} />
        </div>
      </div>
    </>
  );
}
