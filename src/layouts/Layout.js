import React, { useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from '../routes';
import CryptoJS from 'crypto-js';

const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('./Footer'));
const UserHeader = lazy(() => import('./User/Header'));
const UserFooter = lazy(() => import('./User/Footer'));


const decodeJWT = (token) => {
  const parts = token.split('.');
  if (parts.length !== 3) {
      throw new Error('JWT không hợp lệ');
  }
  
  const payload = parts[1];
  const decoded = CryptoJS.enc.Base64.parse(payload);
  return JSON.parse(decoded.toString(CryptoJS.enc.Utf8));
};

const Layout = () => {
  const location = useLocation();
  let isDangNhap = false;
  let isAdmin = false;

  if (location.pathname === '/admin/dang-nhap' || location.pathname === '/admin/dang-nhap/') {
    isDangNhap = true;
  }

  if (location.pathname.split('/')[1] === 'admin') {
    isAdmin = true;
  }

  useEffect(() => {
    if (isAdmin) {
      import('../assets/admin.css');
      if (localStorage.getItem('token')) {
        const decoded = decodeJWT(localStorage.getItem('token'));
        if(decoded.role == 'user'){
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
        }
      }
    } else {
      import('../assets/user.css');
      if (localStorage.getItem('token')) {
        const decoded = decodeJWT(localStorage.getItem('token'));
        if(decoded.role == 'admin'){
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
        }
      }
    }
  }, [isAdmin]);

  return (
    <Suspense>
      {isAdmin ? (
        <div className="layout">
          {!isDangNhap && <Header />}
          <main className="content">
            <AppRoutes />
          </main>
          {!isDangNhap && <Footer />}
        </div>
      ) : (
        <div className="layout">
          <UserHeader />
          <main className="content">
            <AppRoutes />
          </main>
          <UserFooter />
        </div>
      )}
    </Suspense>
  );
};

export default Layout;
