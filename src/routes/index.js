import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BaiVietRoutes from './BaiVietRoutes';
import ChuyenMucRoutes from './ChuyenMucRoutes';
import NguoiDungRoutes from './NguoiDungRoutes';
import CaNhanRoutes from './CaNhanRoutes';
import BinhLuanRoutes from './BinhLuanRoutes';
import DangNhapRoutes from './DangNhapRoutes';

import TrangChuRoutes from './User/TrangChuRoutes'
import UserDangNhapRoutes from './User/DangNhapRoutes'
import DangKyRoutes from './User/DangKyRoutes'
import TaiKhoanRoutes from './User/TaiKhoanRoutes'
import UserBaiVietRoutes from './User/BaiVietRoutes'


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="admin/bai-viet/*" element={<BaiVietRoutes />} />
      <Route path="admin/chuyen-muc/*" element={<ChuyenMucRoutes />} />
      <Route path="admin/nguoi-dung/*" element={<NguoiDungRoutes />} />
      <Route path="admin/ca-nhan/*" element={<CaNhanRoutes />} />
      <Route path="admin/binh-luan/*" element={<BinhLuanRoutes />} />
      <Route path="admin/dang-nhap/" element={<DangNhapRoutes />} />

      <Route path="/" element={<TrangChuRoutes />} />
      <Route path="/dang-nhap" element={<UserDangNhapRoutes />} />
      <Route path="/dang-ky" element={<DangKyRoutes />} />
      <Route path="/tai-khoan/*" element={<TaiKhoanRoutes />} />
      <Route path="/bai-viet/*" element={<UserBaiVietRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
