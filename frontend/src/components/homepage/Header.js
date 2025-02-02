import React from 'react';
import styles from './Header.module.css';
import { MagnifyingGlassIcon, PhotoIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <header className={styles.header}>

      
      <div className={styles.headerCenter}>
        <div className={styles.searchBar}>
        <button className={styles.searchButton}>
        <MagnifyingGlassIcon className={styles.searchIcon} />
        </button>
          <input 
            type="text" 
            placeholder="Subscribe to Create Avatar" 
            className={styles.searchInput}
          />

        </div>
      </div>
      
      {/* <div className={styles.headerRight}>
        <button className={styles.uploadButton}>
          Upload
        </button>
        <div className={styles.userProfile}>


        </div>
      </div> */}
    </header>
  );
};

export default Header;
