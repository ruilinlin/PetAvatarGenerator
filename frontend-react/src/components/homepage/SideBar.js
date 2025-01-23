import React from 'react';
import './SideBar.css';

export default function SideBar() {
  const menuItems = [
    {
      id: 1,
      title: 'Home',
      route: 'Home'
    },
    {
      id: 2,
      title: 'My Pets',
      route: 'MyPets'
    },
    {
      id: 3,
      title: 'Generate',
      route: 'Generate'
    },
    {
      id: 4,
      title: 'Favorites',
      route: 'Favorites'
    },
    {
      id: 5,
      title: 'Settings',
      route: 'Settings'
    }
  ];

  const handleMenuClick = (route) => {
    console.log(`Navigating to ${route}`);
  };

  return (
    <div className="sidebar">
      <div className="user-section">
        <div className="avatar-container">
          <span className="avatar-text">User</span>
        </div>
        <span className="username">Username</span>
      </div>

      <nav className="menu-container">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="menu-item"
            onClick={() => handleMenuClick(item.route)}
          >
            <span className="menu-text">{item.title}</span>
          </div>
        ))}
      </nav>

      <div className="footer">
        <div className="logout-button">
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}
