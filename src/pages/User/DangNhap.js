import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DangNhapServices from '../../services/User/DangNhapServices';
import { useNavigate } from 'react-router-dom';

const DangNhap = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Check for access token in localStorage
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/tai-khoan');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle login logic here (e.g., API call)
        const login = await DangNhapServices.login({ username, password });
        if(login.response && login.response.status === 400){
          //Hiển thị thông báo login.response.data.message
          toast.error(login.response.data.message);
        }else{
          // Lưu token và refreshToken
          toast.success(login.data.message);
          localStorage.setItem('token', login.data.token);
          localStorage.setItem('refreshToken', login.data.refreshToken);
          navigate('/tai-khoan');
        }
    };

    return (
        <>
            <main className="position-relative">
                <div className="archive-header text-center mb-30">
                    <div className="container">
                        <h2>
                            <span className="text-dark">Đăng Nhập</span>
                        </h2>
                        <div className="breadcrumb">
                            Truy cập hệ thống để sử dụng chức năng
                        </div>
                    </div>
                </div>
                <div className='container-fluid pb-50'>
                    <form className="form-contact comment_form w-50 m-auto" action="#" id="commentForm" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        name="name"
                                        id="name"
                                        type="text"
                                        placeholder="Nhập tài khoản"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12 mt-15">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        name="email"
                                        id="password"
                                        type="password"
                                        placeholder="Nhập mật khẩu"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group mt-15 w-100">
                            <button type="submit" className="button button-contactForm w-100">
                                ĐĂNG NHẬP
                            </button>
                        </div>
                        <div className="form-group mt-25 w-100 d-flex justify-content-between">
                            <div className="text-left">
                                Chưa có tài khoản? <Link to='/dang-ky'>Đăng Ký</Link>
                            </div>
                            <div className="text-right">
                                <Link to='/dang-ky'>Quên Mật Khẩu?</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default DangNhap;