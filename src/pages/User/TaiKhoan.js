import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TaiKhoanServices from "../../services/User/TaiKhoanServices";
import BaiVietServices from "../../services/User/BaiVietServices";
import { toast } from "react-toastify";
import { Modal, Button, Form, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRss,
  faUserPen,
  faRightFromBracket,
  faPenToSquare,
  faAnglesRight,
  faCamera,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

function getShortDescription(content, length = 100) {
  // Loại bỏ các thẻ HTML
  const plainText = content.replace(/<[^>]+>/g, "");
  // Lấy một số ký tự đầu tiên làm mô tả ngắn
  return plainText.length > length
    ? plainText.substring(0, length) + "..."
    : plainText;
}

const TaiKhoan = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [articles, setArticles] = useState([]);
  const [followerCount, setFollowerCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [show, setShow] = useState(false);
  const [fullname, setFullname] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarPriview, setAvatarPriview] = useState("");
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredPage, setHoveredPage] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await TaiKhoanServices.profile();
      setUser(response.data.user);
      setFollowerCount(response.data.followerCount);
      setFullname(response.data.user.fullname);
      setAvatarPriview(
        `http://127.0.0.1:3001/${response.data.user.avatar_url}`
      );
      setBio(response.data.user.bio);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  const fetchArticles = async (page = 1) => {
    try {
      const response = await BaiVietServices.listArticles(page);
      setArticles(response.data.articles);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/dang-nhap");
    }
  }, []);

  useEffect(() => {
    fetchUser();
    fetchArticles();
    window.scroll(0, 0);
  }, []);

  const handelLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    toast.success("Đăng xuất thành công");
    navigate("/dang-nhap");
  };

  const handlePageChange = (page) => {
    fetchArticles(page);
    const element = document.getElementById("list-articles-new");
    if (element) {
      element.scrollIntoView({ behavior: "instant", block: "start" });
    }
    setCurrentPage(page);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarUrl(file);
      setAvatarPriview(URL.createObjectURL(file));
    }
  };

  const handleNextChangePassword = () => {
    setIsChangePassword(true);
  };

  const handleChangePassword = async () => {
    const data = {
      password,
      newPassword,
      confirmPassword,
    };
    const changePassword = await TaiKhoanServices.changePassword(data);

    if (changePassword.status === 200) {
      toast.success(changePassword.data.message);
      setShow(false);
    } else {
      toast.success(changePassword.response.data.message);
    }

    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSaveInfo = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("bio", bio);
    formData.append("avatar_url", avatarUrl);

    const update = await TaiKhoanServices.update(formData);

    if (update.status === 200) {
      toast.success(update.data.message);
      fetchUser();
    } else {
      toast.success(update.response.data.message);
    }
    setShow(false);
  };

  const handleBackToInfo = () => {
    setIsChangePassword(false);
  };

  return (
    <>
      <main className="position-relative">
        <div className="container">
          <div className="row mb-50">
            <div className="col-lg-2 d-none d-lg-block" />
            {/* main content */}
            <div className="col-lg-8 col-md-12">
              <div className="author-bio border-radius-10 bg-white p-30 mb-50">
                <div className="author-image mb-30">
                  <a href="author.html">
                    <img
                      src={`http://127.0.0.1:3001/${user.avatar_url}`}
                      alt=""
                      className="avatar"
                      style={{ width: "90px", height: "90px" }}
                    />
                  </a>
                </div>
                <div className="author-info">
                  <h3>
                    <span className="vcard author">
                      <span className="fn">
                        <Link to="#" title="Posts by Robert" rel="author">
                          {user.fullname}
                        </Link>
                      </span>
                    </span>
                  </h3>
                  <h5 className="text-muted">
                    <span className="mr-15">{user.email}</span>
                  </h5>
                  <div className="author-description">
                    {user.bio == null
                      ? "Chưa có thông tin giới thiệu."
                      : user.bio}
                  </div>
                  <Link
                    to="#"
                    className="author-bio-link"
                    style={{ textTransform: "unset" }}
                  >
                    <span className="mr-5 font-x-small">
                      <FontAwesomeIcon icon={faRss} />{" "}
                    </span>
                    {followerCount} người theo dõi
                  </Link>
                  <Link
                    to="#"
                    onClick={() => setShow(true)}
                    className="author-bio-link"
                    style={{ textTransform: "unset" }}
                  >
                    <span className="mr-5 font-x-small">
                      <FontAwesomeIcon icon={faUserPen} />{" "}
                    </span>
                    Cập nhật thông tin
                  </Link>
                  <a
                    href="author.html"
                    onClick={(e) => handelLogout(e)}
                    className="author-bio-link"
                    style={{ textTransform: "unset" }}
                  >
                    <span className="mr-5 font-x-small">
                      <FontAwesomeIcon icon={faRightFromBracket} />{" "}
                    </span>
                    Đăng xuất
                  </a>
                </div>
              </div>
              {articles.length === 0 ? (
                <h2>Chưa có bài viết</h2>
              ) : (
                <h2 id="list-articles-new">Danh sách bài viết</h2>
              )}
              <hr className="wp-block-separator is-style-wide" />
              <div className="latest-post mb-50">
                <div className="loop-list-style-1">
                  {articles.map((article, index) =>
                    index === 0 ? (
                      <article
                        key={index}
                        className="first-post p-10 background-white border-radius-10 mb-30 wow fadeIn animated"
                      >
                        <div className="img-hover-slide border-radius-15 mb-30 position-relative overflow-hidden">
                          <span className="top-right-icon bg-dark">
                            <i className="mdi mdi-flash-on" />
                          </span>
                          <Link to={`/bai-viet/${article.slug}`}>
                            <img
                              style={{ height: "380px", width: "100%" }}
                              src={`http://127.0.0.1:3001/${article.image_url}`}
                              alt="post-slider"
                            />
                          </Link>
                        </div>
                        <div className="pr-10 pl-10">
                          <h4 className="post-title mb-20">
                            <Link to={`/bai-viet/${article.slug}`}>
                              {article.title}
                            </Link>
                          </h4>
                          <p className="post-exerpt font-medium text-muted mb-30">
                            {getShortDescription(article.content, 150)}
                          </p>
                          <div className="mb-20 overflow-hidden">
                            <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase">
                              <span className="post-by">
                                Đăng bởi <Link to="#">{user.fullname}</Link>
                              </span>
                              <span className="post-on">
                                {new Date(article.createdAt).toLocaleDateString(
                                  "vi-VN"
                                )}
                              </span>
                            </div>
                            <div className="float-right">
                              <Link to={`/chinh-sua/${article.article_id}`}>
                                {article.slug === "[rejected]" ? (
                                  <>
                                    <span className="mr-10">
                                      <FontAwesomeIcon
                                        icon={faCircleExclamation}
                                      />
                                    </span>
                                    Bị Từ Chối
                                  </>
                                ) : (
                                  <>
                                    <span className="mr-10">
                                      <FontAwesomeIcon icon={faPenToSquare} />
                                    </span>
                                    Chỉnh Sửa
                                  </>
                                )}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </article>
                    ) : (
                      <article
                        key={index}
                        className="p-10 background-white border-radius-10 mb-30 wow fadeIn animated"
                      >
                        <div className="d-md-flex d-block">
                          <div className="post-thumb post-thumb-big d-flex mr-15 border-radius-15 img-hover-scale">
                            <Link
                              className="color-white"
                              to={`/bai-viet/${article.slug}`}
                            >
                              <img
                                className="border-radius-15"
                                src={`http://127.0.0.1:3001/${article.image_url}`}
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="post-content media-body">
                            <div className="entry-meta mb-15 mt-10">
                              <Link className="entry-meta meta-2" to="#">
                                <span className="post-in text-danger font-x-small">
                                  {new Date(
                                    article.createdAt
                                  ).toLocaleDateString("vi-VN")}
                                </span>
                              </Link>
                            </div>
                            <h5 className="post-title mb-15 text-limit-2-row">
                              <Link to={`/bai-viet/${article.slug}`}>
                                {article.title}
                              </Link>
                            </h5>
                            <p className="post-exerpt font-medium text-muted mb-30 d-none d-lg-block">
                              {getShortDescription(article.content, 150)}
                            </p>
                            <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase">
                              <span className="post-by">
                                Đăng bởi <Link to="#">{user.fullname}</Link>
                              </span>
                              <Link to={`/bai-viet/${article.slug}`}>
                                <span className="mr-10">
                                  <FontAwesomeIcon icon={faAnglesRight} /> Xem
                                  Thêm
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className="float-right">
                            <Link to={`/chinh-sua/${article.article_id}`}>
                              {article.slug === "[rejected]" ? (
                                <>
                                  <span className="mr-10">
                                    <FontAwesomeIcon
                                      icon={faCircleExclamation}
                                    />
                                  </span>
                                  Bị Từ Chối
                                </>
                              ) : (
                                <>
                                  <span className="mr-10">
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                  </span>
                                  Chỉnh Sửa
                                </>
                              )}
                            </Link>
                          </div>
                        </div>
                      </article>
                    )
                  )}
                </div>
              </div>
              {articles.length !== 0 ? (
                <div className="pagination-area mb-30">
                  <nav aria-label="Page navigation example">
                    <ul
                      style={{
                        padding: "0",
                        margin: "0",
                        listStyle: "none",
                        display: "flex",
                      }}
                    >
                      {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index} style={{ margin: "0 5px" }}>
                          <a
                            onClick={() => handlePageChange(index + 1)}
                            onMouseEnter={() => setHoveredPage(index + 1)}
                            onMouseLeave={() => setHoveredPage(null)}
                            style={{
                              display: "inline-flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "40px",
                              height: "40px",
                              padding: "0",
                              backgroundColor:
                                currentPage === index + 1
                                  ? "#FF2E2E"
                                  : hoveredPage === index + 1
                                  ? "#FF4C4C"
                                  : "transparent",
                              color:
                                currentPage === index + 1 ? "white" : "black",
                              borderRadius: "50%",
                              cursor: "pointer",
                              textDecoration: "none",
                            }}
                          >
                            {index + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <Modal show={show} onHide={() => setShow(false)} size="lg">
          <Modal.Header>
            <Modal.Title>
              {isChangePassword ? "Đổi Mật Khẩu" : "Cập Nhật Thông Tin"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {isChangePassword ? (
              <Form>
                <Form.Group controlId="oldPassword" className="mb-3">
                  <Form.Label>Mật khẩu cũ</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu cũ"
                  />
                </Form.Group>
                <Form.Group controlId="newPassword" className="mb-3">
                  <Form.Label>Mật khẩu mới</Form.Label>
                  <Form.Control
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nhập mật khẩu mới"
                  />
                </Form.Group>
                <Form.Group controlId="confirmPassword" className="mb-3">
                  <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Xác nhận mật khẩu mới"
                  />
                </Form.Group>
              </Form>
            ) : (
              <Form>
                <div className="text-center mb-4">
                  <Image
                    src={avatarPriview}
                    roundedCircle
                    alt="Avatar"
                    className="avatar-preview"
                  />
                  <Form.Group controlId="avatarUrl" className="mt-3">
                    <Form.Label className="btn-upload">
                      <FontAwesomeIcon icon={faCamera} /> Chọn ảnh
                      <Form.Control
                        type="file"
                        className="d-none"
                        onChange={handleAvatarChange}
                      />
                    </Form.Label>
                  </Form.Group>
                </div>

                <Form.Group controlId="fullname" className="mb-3">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập họ và tên"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="bio" className="mb-3">
                  <Form.Label>Tiểu sử</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Nhập tiểu sử ngắn gọn"
                    value={bio ?? ""}
                    onChange={(e) => setBio(e.target.value)}
                    required
                  />
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            {!isChangePassword && (
              <>
                <Button
                  className="btn-profile-update"
                  onClick={handleNextChangePassword}
                >
                  Đổi Mật Khẩu
                </Button>
                <Button
                  className="btn-profile-update"
                  onClick={(e) => handleSaveInfo(e)}
                >
                  Lưu Thông Tin
                </Button>
              </>
            )}
            {isChangePassword && (
              <>
                <Button
                  className="btn-profile-update"
                  onClick={handleBackToInfo}
                >
                  Quay lại
                </Button>
                <Button
                  className="btn-profile-update"
                  onClick={handleChangePassword}
                >
                  Đổi Mật Khẩu
                </Button>
              </>
            )}
          </Modal.Footer>
        </Modal>
      </main>
    </>
  );
};

export default TaiKhoan;
