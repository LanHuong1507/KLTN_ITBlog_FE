import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DangNhapServices from '../../services/User/DangNhapServices';
import { useNavigate } from 'react-router-dom';

const DangNhap = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [captchaAnswer, setCaptchaAnswer] = useState('');
    const [captchaText, setCaptchaText] = useState('');
    const canvasRef = useRef(null);

    // Function to generate random CAPTCHA (alphanumeric string with random length)
    const generateCaptcha = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const captchaLength = Math.floor(Math.random() * 3) + 4; // Random length between 4 and 6
        let captcha = '';
        for (let i = 0; i < captchaLength; i++) {
            captcha += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setCaptchaText(captcha); // Store captcha text for validation
        // console.log(captcha); 

        return captcha; // Return the generated captcha
    };

    const drawCaptcha = () => {
        const captchaText = generateCaptcha();
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear the canvas
    
        // Set styles for CAPTCHA text
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
    
        // Calculate the spacing dynamically to avoid characters being cut off
        const padding = 10; // Padding between characters
        const totalWidth = captchaText.length * 30 + padding * (captchaText.length - 1); // Adjust for padding
        const startX = (canvasRef.current.width - totalWidth) / 2; // Center the text on the canvas
    
        // Draw each character with some randomness
        for (let i = 0; i < captchaText.length; i++) {
            const x = startX + i * (30 + padding); // Adjust x position based on character width and padding
            const y = canvasRef.current.height / 2;
    
            // Random rotation for added difficulty
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(Math.random() * 0.5 - 0.25); // Random rotation
            ctx.fillText(captchaText.charAt(i), 0, 0);
            ctx.restore();
        }
    };

    useEffect(() => {
        // Draw CAPTCHA when component is mounted
        drawCaptcha();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if CAPTCHA is correct
        if (captchaAnswer !== captchaText) {
            toast.error("Câu trả lời CAPTCHA không chính xác!");
            drawCaptcha();  // Redraw CAPTCHA
            return;
        }

        // Handle login logic here (e.g., API call)
        const login = await DangNhapServices.login({ username, password });
        if (login.response && login.response.status === 400) {
            toast.error(login.response.data.message);
            drawCaptcha();
            setCaptchaAnswer('');
        } else {
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
                                        className="form-control border-radius-15"
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
                                        className="form-control border-radius-15"
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
                            <div className="col-sm-12 mt-15">
                                <div className="form-group d-flex align-items-center">
                                    <canvas
                                        ref={canvasRef}
                                        width="250"
                                        height="50"
                                        style={{ border: '1px solid #ccc', background: 'white', borderRadius: 15 }}
                                    />
                                    <input
                                        className="form-control ml-3"
                                        type="text"
                                        placeholder="Nhập câu trả lời CAPTCHA"
                                        value={captchaAnswer}
                                        onChange={(e) => setCaptchaAnswer(e.target.value)}
                                        style={{ maxWidth: '200px' }} 
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
                                <Link to='/quen-mat-khau'>Quên Mật Khẩu?</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}

export default DangNhap;