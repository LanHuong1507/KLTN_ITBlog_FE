import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DangNhapRoutes from './DangNhapRoutes';
import DangKyRoutes from './DangKyRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="admin/dang-nhap/" element={<DangNhapRoutes />} />
      <Route path="admin/dang-ky/" element={<DangKyRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
