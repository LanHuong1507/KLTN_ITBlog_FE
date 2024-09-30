import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BaiVietRoutes from './BaiVietRoutes';
import ChuyenMucRoutes from './ChuyenMucRoutes';
import DangKyRoutes from './DangKyRoutes'
import DangNhapRoutes from './DangNhapRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="admin/bai-viet/*" element={<BaiVietRoutes />} />
      <Route path="admin/chuyen-muc/*" element={<ChuyenMucRoutes />} />
      <Route path="admin/dang-nhap/" element={<DangNhapRoutes />} />
      <Route path="admin/dang-ky/*" element={<DangKyRoutes/>}/>
    </Routes>
  );
};

export default AppRoutes;
