import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AppRoutes from '../routes';

const Layout = () => {
  const location = useLocation();
  let isDangNhap = false;
  if (
    location.pathname === '/admin/dang-nhap' || 
    location.pathname === '/admin/dang-nhap/' ||
    location.pathname === '/admin/dang-ky' || 
    location.pathname === '/admin/dang-ky/'
  ) {
    isDangNhap = true;
  }

  return (
    <div className="layout">
      {!isDangNhap && <Header />}
      <main className="content">
        <AppRoutes />
      </main>
      {!isDangNhap && <Footer />}
    </div>
  );
};

export default Layout;
