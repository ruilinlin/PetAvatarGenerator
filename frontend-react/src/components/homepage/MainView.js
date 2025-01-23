import React from 'react';
import './MainView.css';

export default function MainView() {
  return (
    <div className="main-container">
      <div className="gallery-grid">
        {/* 这里可以放置您的图片网格 */}
        <div className="gallery-item">
          <img src="/path-to-your-image.jpg" alt="Pet Avatar" />
        </div>
        {/* 可以添加更多图片项 */}
      </div>
    </div>
  );
}