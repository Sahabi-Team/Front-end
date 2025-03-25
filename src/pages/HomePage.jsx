import React from 'react';
import Footer from '../components/Footer.jsx';
const HomePage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>به صفحه اصلی خوش آمدید</h1>
      <p>این یک نمونه محتوا برای تست اسکرول و نمایش فوتر است.</p>
      <div style={{ height: '800px', backgroundColor: '#f4f4f4', marginTop: '20px' }}>
        <h2>محتوای بلند برای تست اسکرول</h2>
        <Footer/> 
      </div>
    </div>
  );
};

export default HomePage;