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

// 使用 getServerSideProps 支持动态搜索和分页
export async function getServerSideProps({ query }) {
  const { page = 1, limit = 200, type, search } = query;  // 增加默认限制到100
  
  try {
    console.log('Fetching data from:', `http://localhost:5000/api/assets?page=${page}&limit=${limit}${type ? `&type=${type}` : ''}${search ? `&search=${search}` : ''}`);
    
    const res = await fetch(
      `http://localhost:5000/api/assets?page=${page}&limit=${limit}${type ? `&type=${type}` : ''}${search ? `&search=${search}` : ''}`
    );
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const text = await res.text();
    console.log('Raw response:', text);
    
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error('JSON parse error:', e);
      throw new Error('Invalid JSON response from server');
    }

    if (!data || !data.assets) {
      throw new Error('Invalid data structure received from server');
    }

    return {
      props: {
        assets: data.assets,
        pagination: {
          total: data.total,
          pages: data.pages,
          currentPage: parseInt(page),
          limit: parseInt(limit)
        }
      }
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        assets: [],
        pagination: {
          total: 0,
          pages: 0,
          currentPage: 1
        },
        error: error.message || 'Failed to load gallery'
      }
    };
  }
}

export default function Home({ assets, pagination, error }) {
  return (
    <>
      <div className={`app-container ${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <div className="main-content">
          <SideBar />
          <Gallery 
            assets={assets} 
            pagination={pagination}
          />
        </div>
      </div>
    </>
  );
}
