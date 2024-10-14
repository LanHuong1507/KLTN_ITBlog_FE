import { useEffect, useState } from 'react';
import DangKyServices from '../../services/User/DangKyServices'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DangKy = () => {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/tai-khoan');
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const register = await DangKyServices.register({ fullname, username, email, password });

        if(register.response && register.response.status === 400){
          toast.error(register.response.data.message);
        }else{
          toast.success(register.data.message);
          navigate('/dang-nhap');
        }
    };

    return (
        <>
            <main className="position-relative">
                <div className="archive-header text-center mb-30">
                    <div className="container">
                        <h2>
                            <span className="text-dark">Đăng Ký</span>
                        </h2>
                        <div className="breadcrumb">
                            Tạo tài khoản để truy cập hệ thống
                        </div>
                    </div>
                </div>
                <div className='container-fluid pb-50'>
                    <form 
                        className="form-contact comment_form w-50 m-auto" 
                        action="#" 
                        id="commentForm"
                        onSubmit={handleSubmit}
                    >
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        name="fullname"
                                        id="fullname"
                                        type="text"
                                        placeholder="Họ tên"
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        name="email"
                                        id="email"
                                        type="email"
                                        placeholder="Nhập email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        name="username"
                                        id="username"
                                        type="text"
                                        placeholder="Nhập tài khoản"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        name="password"
                                        id="password"
                                        type="password"
                                        placeholder="Nhập mật khẩu"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group mt-15 w-100">
                            <button type="submit" className="button button-contactForm w-100">
                                ĐĂNG KÝ
                            </button>
                        </div>
                        <div className="form-group mt-25 w-100">
                            <div className="text-center">
                                Đã có tài khoản? <Link to='/dang-nhap'>Đăng Nhập</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default DangKy;
