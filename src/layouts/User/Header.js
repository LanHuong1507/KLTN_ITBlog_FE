import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faArrowTrendUp,
  faFire,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import {
  faPenToSquare,
  faBell,
  faUser,
} from "@fortawesome/free-regular-svg-icons";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/tim-kiem?s=${encodeURIComponent(searchTerm)}`);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
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
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2 col-md-3 d-flex justify-content-between align-items-center">
              <div className="header-logo">
                <Link to="/">
                  <img
                    className="logo-img d-inline"
                    src="https://i.imgur.com/LshhZtk.png"
                    alt=""
                    style={{ height: "60px", objectFit: "contain" }}
                  />
                </Link>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="menu-toggle d-lg-none"
              >
                <FontAwesomeIcon icon={faBars} size="lg" />
              </button>
            </div>
            <div className="col-lg-10 col-md-9 main-header-navigation d-none d-lg-flex">
              <div className="main-nav text-left float-lg-left float-md-right">
                <nav>
                  <ul className="main-menu float-right">
                    <li>
                      <Link to="/">
                        <span className="mr-15">
                          <FontAwesomeIcon icon={faHouse} />
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
                      <Link
                        to={
                          !localStorage.getItem("token")
                            ? "/dang-nhap"
                            : "/theo-doi"
                        }
                      >
                        <span className="mr-15">
                          <FontAwesomeIcon icon={faFire} />
                        </span>
                        THEO DÕI
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="off-canvas-toggle-cover d-none d-lg-flex">
                <form
                  action="#"
                  method="get"
                  className="search-form position-relative mr-20"
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
          {isMobileMenuOpen && (
            <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
              <nav>
                <ul className="main-menu">
                  <li>
                    <Link to="/">
                      <span className="mr-15">
                        <FontAwesomeIcon icon={faHouse} />
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
                    <Link
                      to={
                        !localStorage.getItem("token")
                          ? "/dang-nhap"
                          : "/theo-doi"
                      }
                    >
                      <span className="mr-15">
                        <FontAwesomeIcon icon={faFire} />
                      </span>
                      THEO DÕI
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="red-tooltip text-danger"
                      to="/viet-bai"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Viết bài mới"
                    >
                      <span className="mr-15">
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          style={{ fontSize: 20 }}
                        />
                      </span>
                      Viết bài mới
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="red-tooltip text-success"
                      to="/thong-bao"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Thông báo"
                    >
                      <span className="mr-15">
                        <FontAwesomeIcon
                          icon={faBell}
                          style={{ fontSize: 20 }}
                        />
                      </span>
                      Thông báo
                    </Link>
                  </li>
                  <li>
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
                      <span className="mr-15">
                        <FontAwesomeIcon
                          icon={faUser}
                          style={{ fontSize: 20 }}
                        />
                      </span>
                      Tài khoản
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
