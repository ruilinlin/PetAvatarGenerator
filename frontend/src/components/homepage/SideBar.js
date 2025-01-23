import React from 'react';
import Link from 'next/link';  // 使用 Next.js 的 Link 组件
import styles from './SideBar.module.css';

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.userSection}>
        <div className={styles.avatarContainer}>
          <span className={styles.avatarText}>User</span>
        </div>
        <span className={styles.username}>Username</span>
      </div>

      <nav className={styles.menuContainer}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>
              <span className={styles.icon}>🏠</span>
              <span className={styles.text}>Home</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/gallery" className={styles.navLink}>
              <span className={styles.icon}>🖼️</span>
              <span className={styles.text}>Gallery</span>
            </Link>
          </li>
          {/* 添加更多导航项 */}
        </ul>
      </nav>

      <div className={styles.footer}>
        <div className={styles.logoutButton}>
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
