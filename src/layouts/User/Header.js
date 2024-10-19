import React, { useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faArrowTrendUp,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import {
  faPenToSquare,
  faBell,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/tim-kiem?s=${encodeURIComponent(searchTerm)}`);
    }
  };
  return (
    <>
      <header
        className="main-header header-style-2 mb-40"
        style={{
          marginLeft: 0,
          position: "sticky",
          top: 0,
          zIndex: 999,
          backgroundColor: "white",
        }}
      >
        <div className="header-bottom header-sticky background-white text-center">
          <div className="scroll-progress gradient-bg-1" />
          <div className="mobile_menu d-lg-none d-block" />
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-md-3">
                <div className="header-logo d-none d-lg-block">
                  <Link to="/">
                    <img
                      className="logo-img d-inline"
                      src="https://i.imgur.com/LshhZtk.png"
                      alt=""
                      style={{ height: "60px", objectFit: "contain" }}
                    />
                  </Link>
                </div>
                <div className="logo-tablet d-md-inline d-lg-none d-none">
                  <Link to="/">
                    <img
                      className="logo-img d-inline"
                      src="https://i.imgur.com/LshhZtk.png"
                      alt=""
                      style={{ height: "60px", objectFit: "contain" }}
                    />
                  </Link>
                </div>
                <div className="logo-mobile d-block d-md-none">
                  <Link to="/">
                    <img
                      className="logo-img d-inline"
                      src="assets/imgs/favicon.svg"
                      alt=""
                      style={{ height: "40px", objectFit: "contain" }}
                    />
                  </Link>
                </div>
              </div>
              <div className="col-lg-10 col-md-9 main-header-navigation">
                <div className="main-nav text-left float-lg-left float-md-right">
                  <nav>
                    <ul className="main-menu d-none d-lg-inline float-right">
                      <li>
                        <Link to="/">
                          <span className="mr-15">
                            <FontAwesomeIcon icon={faHouse} />{" "}
                          </span>
                          TRANG CHỦ
                        </Link>
                      </li>
                      <li>
                        <Link to="/xu-huong">
                          <span className="mr-15">
                            <FontAwesomeIcon icon={faArrowTrendUp} />
                          </span>
                          XU HƯỚNG
                        </Link>
                      </li>
                      <li>
                        <Link to="/bai-viet">
                          <span className="mr-15">
                            <FontAwesomeIcon icon={faFire} />
                          </span>
                          THEO DÕI
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="off-canvas-toggle-cover">
                  <form
                    action="#"
                    method="get"
                    className="search-form d-lg-inline float-left position-relative d-none mr-20"
                    onSubmit={handleSearch}
                  >
                    <input
                      type="text"
                      className="search_field"
                      placeholder="Nhập tên bài viết"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      name="s"
                    />
                    <span className="search-icon">
                      <i className="ti-search mr-5" />
                    </span>
                  </form>
                  <div className="d-inline tools-icon">
                    <Link
                      className="red-tooltip text-danger"
                      to="/viet-bai"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Viết bài mới"
                    >
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="ml-15"
                        style={{ fontSize: 20 }}
                      />
                    </Link>
                    <Link
                      className="red-tooltip text-success"
                      to="/thong-bao"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Thông báo"
                    >
                      <FontAwesomeIcon
                        icon={faBell}
                        className="ml-15"
                        style={{ fontSize: 20 }}
                      />
                      <span className="notification bg-success">5</span>
                    </Link>
                    <Link
                      className="red-tooltip text-primary"
                      to={
                        !localStorage.getItem("token")
                          ? "/dang-nhap"
                          : "/tai-khoan"
                      }
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Tài khoản"
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        className="ml-15"
                        style={{ fontSize: 20 }}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
