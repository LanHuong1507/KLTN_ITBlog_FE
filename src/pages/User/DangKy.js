import { useEffect, useState } from "react";
import DangKyServices from "../../services/User/DangKyServices";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DangKy = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State for error messages
  const [errorMessages, setErrorMessages] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/tai-khoan");
    }
  }, [navigate]);

  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/; // Updated regex for email
  const fullnameRegex = /^[A-ZÀ-Ý][a-zà-ỹ]+(\s[A-ZÀ-Ý][a-zà-ỹ]+)*$/;

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset error messages
    setErrorMessages({
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    // Check for empty fields
    if (!fullname || !username || !email || !password || !confirmPassword) {
      toast.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    let hasError = false;

    // Validate each field
    if (!fullnameRegex.test(fullname)) {
      setErrorMessages((prev) => ({
        ...prev,
        fullname:
          "Họ tên không hợp lệ. Họ tên phải bắt đầu bằng chữ hoa và không chứa số.",
      }));
      hasError = true;
    }

    if (!usernameRegex.test(username)) {
      setErrorMessages((prev) => ({
        ...prev,
        username:
          "Tài khoản không hợp lệ. Tài khoản phải bắt đầu bằng chữ cái và có từ 3 đến 15 ký tự.",
      }));
      hasError = true;
    }

    if (!emailRegex.test(email)) {
      setErrorMessages((prev) => ({
        ...prev,
        email:
          "Email không hợp lệ. Vui lòng đảm bảo email chứa '@' và đúng định dạng.",
      }));
      hasError = true;
    }

    if (password !== confirmPassword) {
      setErrorMessages((prev) => ({
        ...prev,
        confirmPassword: "Mật khẩu và xác nhận mật khẩu không khớp.",
      }));
      hasError = true;
    }

    if (!validatePassword(password)) {
      setErrorMessages((prev) => ({
        ...prev,
        password:
          "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ cái, số và ký tự đặc biệt.",
      }));
      hasError = true;
    }

    if (hasError) return;

    // Perform registration
    const register = await DangKyServices.register({
      fullname,
      username,
      email,
      password,
    });

    if (register.response && register.response.status === 400) {
      toast.error(register.response.data.message);
    } else {
      toast.success(register.data.message);
      navigate("/dang-nhap");
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
            <div className="breadcrumb">Tạo tài khoản để truy cập hệ thống</div>
          </div>
        </div>
        <div className="container-fluid pb-50">
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
                  />
                  {errorMessages.fullname && (
                    <small className="text-danger">
                      {errorMessages.fullname}
                    </small>
                  )}
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
                  />
                  {errorMessages.email && (
                    <small className="text-danger">{errorMessages.email}</small>
                  )}
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
                  />
                  {errorMessages.username && (
                    <small className="text-danger">
                      {errorMessages.username}
                    </small>
                  )}
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
                  />
                  {errorMessages.password && (
                    <small className="text-danger">
                      {errorMessages.password}
                    </small>
                  )}
                </div>
              </div>
              <div className="col-sm-12">
                <div className="form-group">
                  <input
                    className="form-control"
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {errorMessages.confirmPassword && (
                    <small className="text-danger">
                      {errorMessages.confirmPassword}
                    </small>
                  )}
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
                Đã có tài khoản? <Link to="/dang-nhap">Đăng Nhập</Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default DangKy;
