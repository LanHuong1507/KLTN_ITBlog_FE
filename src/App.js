import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './layouts/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/admin.css';

const App = () => {
  return (
    <Router>
      <Layout />
      <ToastContainer />
    </Router>
  );
};

export default App;
