import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BaiVietRoutes from './BaiVietRoutes';
import ChuyenMucRoutes from './ChuyenMucRoutes';
import DangKyRoutes from './DangKyRoutes'
import DangNhapRoutes from './DangNhapRoutes';
import CaNhanRoutes from './CaNhanRoutes';
import BinhLuanRoutes from './BinhLuanRoutes';
import NguoiDungRoutes from './NguoiDungRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="admin/bai-viet/*" element={<BaiVietRoutes />} />
      <Route path="admin/chuyen-muc/*" element={<ChuyenMucRoutes />} />
   <Route path="admin/ca-nhan/*" element={<CaNhanRoutes />} />
      <Route path="admin/binh-luan/*" element={<BinhLuanRoutes />} />
      <Route path="admin/nguoi-dung/*" element={<NguoiDungRoutes />} />
      <Route path="admin/dang-nhap/" element={<DangNhapRoutes />} />
      <Route path="admin/dang-ky/*" element={<DangKyRoutes/>}/>
    </Routes>
  );
};

export default AppRoutes;
