import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <h1 className={styles.title}>Gallery</h1>
      </div>
      
      <div className={styles.headerCenter}>
        <div className={styles.searchBar}>
          <input 
            type="text" 
            placeholder="Search..." 
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>
            🔍
          </button>
        </div>
      </div>
      
      <div className={styles.headerRight}>
        <button className={styles.uploadButton}>
          Upload
        </button>
        <div className={styles.userProfile}>
          {/* <img 
            src="/default-avatar.png" 
            alt="User" 
            className={styles.avatar}
          /> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
