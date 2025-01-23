import React from 'react';
import SideBar from './components/homepage/SideBar';
import Header from './components/homepage/Header';
import Gallery from './components/homepage/Gallery';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <SideBar />
      <div className="main-content">
        <Header />
        {/* <Gallery /> */}
      </div>
    </div>
  );
}

export default App;
