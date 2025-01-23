import React from 'react';
import SearchBar from './SearchBar';
import './Header.css';

export default function Header() {
  const handleSearch = ({ searchTerm, filter }) => {
    console.log('Search:', searchTerm, filter);
    // 这里可以添加搜索逻辑
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo-container">
          <img src="/logo.png" alt="Logo" className="logo" />
        </div>
      </div>
      
      <div className="header-center">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="header-right">
        {/* 如果需要添加其他元素 */}
      </div>
    </header>
  );
}
