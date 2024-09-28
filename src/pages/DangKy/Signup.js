import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DangKyServices from '../../services/DangKyServices';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    const signup = await DangKyServices.signup({ username, email, password });
    if (signup.response && signup.response.status === 400) {
      toast.error(signup.response.data.message);
    } else {
      toast.success('Account created successfully!');
      navigate('/login');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-sm p-4" style={{ width: '500px' }}>
        <div className="card-body text-center">
          <img
            src="../logo.png"
            alt="Logo"
            style={{ width: '100px', height: '100px' }}
            className="mb-3"
          />
          <h3 className="text-center mb-4"><b>Đăng Ký Tài Khoản Mới</b></h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tài khoản"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faUser} />
                </span>
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Mật khẩu"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Xác nhận mật khẩu"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <button type="submit" className="btn btn-primary w-100">
                  <FontAwesomeIcon icon={faUserPlus} /> Đăng Ký
                </button>
              </div>
            </div>
          </form>
          <p className="mt-3">
            Đã có tài khoản? <Link to="/login">Đăng Nhập</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
