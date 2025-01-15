import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>
      <nav className="nav-links">
        {/* 如果需要导航链接 */}
      </nav>
    </header>
  );
}
