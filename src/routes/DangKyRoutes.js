import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from '../pages/DangKy/Signup';

const DangKyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
    </Routes>
  );
};

export default DangKyRoutes;