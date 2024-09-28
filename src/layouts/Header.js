import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    if(!token || !refreshToken){
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      navigate('/admin/dang-nhap'); 
    }
    
  })

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    toast.success('Đăng xuất thành công');
    navigate('/admin/dang-nhap'); 
  }

  return (
    <div className="hold-transition sidebar-mini layout-fixed">
      <div className="wrapper">
        {/* Navbar */}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
            </li>
          </ul>
        </nav>
        {/* /.navbar */}
        {/* Main Sidebar Container */}
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <Link to="/" className="brand-link">
            <img src="../logo.png" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
            <span className="brand-text font-weight-light text-center">QUẢN TRỊ VIÊN</span>
          </Link>
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li className="nav-item has-treeview menu-open">
                  <Link to="/" className="nav-link active">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Trang Chủ
                    </p>
                  </Link>
                </li>
                <li className="nav-header">QUẢN LÝ BÀI VIẾT</li>
                <li className="nav-item has-treeview">
                  <Link to="/admin/bai-viet" className="nav-link">
                    <i className="nav-icon fa-solid fa-newspaper" />
                    <p>
                      Bài Viết
                    </p>
                  </Link>
                </li>
                <li className="nav-item has-treeview">
                  <Link to="/admin/chuyen-muc" className="nav-link">
                    <i className="nav-icon fa-solid fa-layer-group" />
                    <p>
                      Chuyên Mục
                    </p>
                  </Link>
                </li>

                <li className="nav-header">QUẢN LÝ NGƯỜI DÙNG</li>
                <li className="nav-item has-treeview">
                  <Link to="/admin/nguoi-dung" className="nav-link">
                    <i className="nav-icon fa-solid fa-users" />
                    <p>
                      Người Dùng
                    </p>
                  </Link>
                </li>
                <li className="nav-item has-treeview">
                  <Link to="/admin/binh-luan" className="nav-link">
                    <i className="nav-icon fa-solid fa-comments" />
                    <p>
                      Bình Luận
                    </p>
                  </Link>
                </li>

                <li className="nav-header">QUẢN LÝ CÁ NHÂN</li>
                <li className="nav-item has-treeview">
                  <Link to="/admin/ca-nhan" className="nav-link">
                    <i className="nav-icon fa-solid fa-lock" />
                    <p>
                      Đổi Thông Tin
                    </p>
                  </Link>
                </li>
                <li className="nav-item has-treeview">
                  <a style={{ cursor: 'pointer' }} className="nav-link" onClick={handleLogout}>
                    <i className="nav-icon fa-solid fa-right-from-bracket" />
                    <p>
                      Đăng Xuất
                    </p>
                  </a>
                </li>
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
      </div>

    </div>
  );
};

export default Header;
