import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Show from '../pages/CaNhan/Show';


const CaNhanRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Show />} />
    </Routes>
  );
};

export default CaNhanRoutes;
