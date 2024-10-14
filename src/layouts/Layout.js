import React, { useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from '../routes';

const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('./Footer'));
const UserHeader = lazy(() => import('./User/Header'));
const UserFooter = lazy(() => import('./User/Footer'));

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
    } else {
      import('../assets/user.css');
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
