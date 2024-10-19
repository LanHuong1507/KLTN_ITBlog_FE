import { useEffect, useState } from "react";
import TrangChuServices from "../../services/User/TrangChuServices";
import { Link } from "react-router-dom";

function getShortDescription(content, length = 100) {
  const plainText = content.replace(/<[^>]+>/g, "");
  return plainText.length > length
    ? plainText.substring(0, length) + "..."
    : plainText;
}

const TrangChu = () => {
  const [topCategories, setTopCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [topTrendings, setTopTrendings] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);
  const [lastComments, setLastComments] = useState([]);
  const [topInteracts, setTopInteracts] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [topPopularToday, setTopPopularToday] = useState({});
  const [currentPage, setCurrentPage] = useState(1); 
  const [hoveredPage, setHoveredPage] = useState(null);

  const fetchArticles = async (page = 1) => {
    try {
      const response = await TrangChuServices.getListArticles(page);
      setArticles(response.data.articles);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  const fetchTopTrendings = async () => {
    try {
      const response = await TrangChuServices.getTopTrending();
      setTopTrendings(response.data.articles);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  const fetchMostPopular = async () => {
    try {
      const response = await TrangChuServices.getMostPopular();
      setMostPopular(response.data.articles);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  const fetchLastComments = async () => {
    try {
      const response = await TrangChuServices.getLastComment();
      setLastComments(response.data.comments);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  const fetchTopInteracts = async () => {
    try {
      const response = await TrangChuServices.getTopInteract();
      setTopInteracts(response.data.articles);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  const fetchNewUsers = async () => {
    try {
      const response = await TrangChuServices.getNewUser();
      setNewUsers(response.data.users);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  const fetchTopCategories = async () => {
    try {
      const response = await TrangChuServices.getTopCategories();
      setTopCategories(response.data.categories);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  const fetchTopPopularToday = async () => {
    try {
      const response = await TrangChuServices.getTopPopularToday();
      setTopPopularToday(response.data.article);
      console.log(response.data.article);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchTopTrendings();
    fetchMostPopular();
    fetchLastComments();
    fetchTopInteracts();
    fetchNewUsers();
    fetchTopCategories();
    fetchTopPopularToday();
  }, []);

  const handlePageChange = async (page) => {
    try {
      await fetchArticles(page); // Fetch articles for the selected page
      const element = document.getElementById("list-articles-new"); // Get the element to scroll to
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" }); // Smooth scroll to the element
      }
      setCurrentPage(page); // Update the current page state
    } catch (error) {
      console.error("Error fetching articles:", error); // Handle any errors during fetching
    }
  };

  return (
    <>
      <div className="main-wrap">
        <main className="position-relative">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 order-1 order-md-2">
                <div className="row">
                  <div className="col-lg-8 col-md-12">
                    {/* Featured posts */}
                    <div className="featured-post mb-50">
                      <h4 className="widget-title mb-30">
                        Nổi Bật <span>Trong Ngày</span>
                      </h4>
                      <div className="featured-slider-1 border-radius-10">
                        <div className="featured-slider-1-items">
                          <div className="slider-single p-10">
                            <div className="img-hover-slide border-radius-15 mb-30 position-relative overflow-hidden">
                              <span className="top-right-icon bg-dark">
                                <i className="mdi mdi-camera-alt" />
                              </span>
                              <Link to={`/bai-viet/${topPopularToday.slug}`}>
                                <img
                                  src={`http://127.0.0.1:3001/${topPopularToday.image_url}`}
                                  alt="post-slider"
                                />
                              </Link>
                            </div>
                            <div className="pr-10 pl-10">
                              <h4 className="post-title mb-20">
                                <Link to={`/bai-viet/${topPopularToday.slug}`}>
                                  {topPopularToday.title}
                                </Link>
                              </h4>
                              <div className="mb-20 overflow-hidden">
                                <div className="entry-meta meta-2 float-left">
                                  <a
                                    className="float-left mr-10 author-img"
                                    href="author.html"
                                    tabIndex={0}
                                  >
                                    <img
                                      src={`http://127.0.0.1:3001/${topPopularToday.avatar_url}`}
                                      alt=""
                                    />
                                  </a>
                                  <Link
                                    to={`/nguoi-dung/${topPopularToday.username}`}
                                    tabIndex={0}
                                  >
                                    <span className="author-name text-grey">
                                      {topPopularToday.fullname}
                                    </span>
                                  </Link>
                                  <br />
                                  <span className="author-add color-grey">
                                    {new Date(
                                      topPopularToday.createdAt
                                    ).toLocaleDateString("vi-VN")}
                                  </span>
                                </div>
                                <div className="float-right">
                                  <Link
                                    to={`/bai-viet/${topPopularToday.slug}`}
                                    className="read-more"
                                  >
                                    <span className="mr-10">
                                      <i
                                        className="fa fa-thumbtack"
                                        aria-hidden="true"
                                      />
                                    </span>
                                    Đọc Thêm
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*Videos*/}
                    <div className="sidebar-widget">
                      <div className="widget-header position-relative mb-20">
                        <div className="row">
                          <div className="col-7">
                            <h5 className="widget-title mb-0">
                              Top <span>Chuyên Mục</span>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="block-tab-item post-module-1 post-module-4">
                        <div className="row">
                          {topCategories.map((category, index) => (
                            <div
                              key={index}
                              className="slider-single col-md-6 mb-30"
                            >
                              <div className="img-hover-scale border-radius-10">
                                <span className="top-right-icon background10">
                                  <i className="mdi mdi-share" />
                                </span>
                                <Link to={`/chuyen-muc/${category.slug}`}>
                                  <img
                                    className="border-radius-10"
                                    src={`http://127.0.0.1:3001/${category.image_url}`}
                                    alt="post-slider"
                                    style={{ height: "250px", width: "100%" }}
                                  />
                                </Link>
                              </div>
                              <h5 className="post-title pr-5 pl-5 mb-10 mt-15 text-limit-2-row">
                                <Link to={`/chuyen-muc/${category.slug}`}>
                                  {category.name}
                                </Link>
                              </h5>
                              <div className="entry-meta meta-1 font-x-small mt-10 pr-5 pl-5 text-muted">
                                <span>
                                  Số bài viết: {category.article_count} bài
                                </span>
                                <a className="float-right" href="#">
                                  <i className="ti-bookmark" />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12 sidebar-right">
                    {/*Post aside style 1*/}
                    <div className="sidebar-widget mb-30">
                      <div className="widget-header position-relative mb-30">
                        <div className="row">
                          <div className="col-7">
                            <h4 className="widget-title mb-0">
                              Top <span>Tương Tác</span>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="post-aside-style-1 border-radius-10 p-20 bg-white">
                        <ul className="list-post">
                          {topInteracts.map((article, index) => (
                            <li key={index} className="mb-20">
                              <div className="d-flex">
                                <div className="post-thumb d-flex mr-15 border-radius-5 img-hover-scale">
                                  <Link
                                    className="color-white"
                                    to={`/nguoi-dung/${article.username}`}
                                  >
                                    <img
                                      style={{ height: "50px", width: "50px" }}
                                      src={`http://127.0.0.1:3001/${article.avatar_url}`}
                                      alt=""
                                    />
                                  </Link>
                                </div>
                                <div className="post-content media-body">
                                  <h6 className="post-title mb-10 text-limit-2-row">
                                    <Link to={`/bai-viet/${article.slug}`}>
                                      {article.title}
                                    </Link>
                                  </h6>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {/*Top authors*/}
                    <div className="sidebar-widget mb-30">
                      <div className="widget-top-auhor border-radius-10 p-20 bg-white">
                        <div className="widget-header widget-header-style-1 position-relative mb-15">
                          <h5 className="widget-title pl-5">
                            Tác Giả <span>Mới</span>
                          </h5>
                        </div>
                        {newUsers.map((user, index) => (
                          <Link
                            className="red-tooltip"
                            to={`/nguoi-dung/${user.username}`}
                            data-toggle="tooltip"
                            data-placement="top"
                            title={user.fullname}
                            data-original-title="Emma - 1034 posts"
                            key={index}
                          >
                            <img
                              src={`http://127.0.0.1:3001/${user.avatar_url}`}
                              alt=""
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                    {/*Newsletter*/}
                    <div className="sidebar-widget widget_newsletter border-radius-10 p-20 bg-white mb-30">
                      <div className="widget-header widget-header-style-1 position-relative mb-15">
                        <h5 className="widget-title">Đăng Ký Nhận Tin</h5>
                      </div>
                      <div className="newsletter">
                        <p className="font-medium">
                          Đăng ký để không bỏ lỡ tin tức mới
                        </p>
                        <form
                          target="_blank"
                          action="#"
                          method="get"
                          className="subscribe_form relative mail_part"
                        >
                          <div className="form-newsletter-cover">
                            <div className="form-newsletter position-relative">
                              <input
                                type="email"
                                name="EMAIL"
                                placeholder="Nhập email của bạn"
                                required=""
                              />
                              <button type="submit">
                                <i className="ti ti-email" />
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    {/*Post aside style 2*/}
                    <div className="sidebar-widget">
                      <div className="widget-header mb-30">
                        <h5 className="widget-title">
                          Đang <span>Xu Hướng</span>
                        </h5>
                      </div>
                      <div className="post-aside-style-2">
                        <ul className="list-post">
                          {topTrendings.map((article, index) => (
                            <li
                              key={index}
                              className="mb-30 wow fadeIn animated"
                            >
                              <div className="d-flex">
                                <div className="post-thumb d-flex mr-15 border-radius-5 img-hover-scale">
                                  <Link
                                    className="color-white"
                                    to={`/bai-viet/${article.slug}`}
                                  >
                                    <img
                                      style={{ height: "150px" }}
                                      src={`http://127.0.0.1:3001/${article.image_url}`}
                                      alt=""
                                    />
                                  </Link>
                                </div>
                                <div className="post-content media-body">
                                  <h6 className="post-title mb-10 text-limit-2-row">
                                    <Link to={`/bai-viet/${article.slug}`}>
                                      {article.title}
                                    </Link>
                                  </h6>
                                  <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase">
                                    <span className="post-by">
                                      Bởi{" "}
                                      <Link
                                        to={`/nguoi-dung/${article.username}`}
                                      >
                                        {article.fullname}
                                      </Link>
                                    </span>
                                    <span className="post-on">
                                      {new Date(
                                        article.createdAt
                                      ).toLocaleDateString("vi-VN")}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-8 col-md-12">
                    <div className="latest-post mb-50">
                      <div className="widget-header position-relative mb-30">
                        <div className="row">
                          <div className="col-7">
                            <h4
                              className="widget-title mb-0"
                              id="list-articles-new"
                            >
                              Bài Viết <span>Mới</span>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="loop-list-style-1">
                        {articles.map((article, index) => (
                          <article
                            key={index}
                            className="p-10 background-white border-radius-10 mb-30 wow fadeIn animated"
                          >
                            <div className="d-flex">
                              <div className="post-thumb d-flex mr-15 border-radius-15 img-hover-scale">
                                <Link
                                  className="color-white"
                                  to={`/bai-viet/${article.slug}`}
                                >
                                  <img
                                    style={{ width: "200px", height: "200px" }}
                                    className="border-radius-15"
                                    src={`http://127.0.0.1:3001/${article.image_url}`}
                                    alt={article.title}
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
                                    Đăng bởi{" "}
                                    <Link
                                      to={`/nguoi-dung/${article.user.username}`}
                                    >
                                      {article.user.fullname}
                                    </Link>
                                  </span>
                                  <span className="post-on">
                                    {article.views.length == 0
                                      ? 0
                                      : article.views[0].view_count}{" "}
                                    lượt xem
                                  </span>
                                </div>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
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
                                      currentPage === index + 1
                                        ? "white"
                                        : "black",
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
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12 sidebar-right">
                    <div className="sidebar-widget mb-50">
                      <div className="widget-header mb-30">
                        <h5 className="widget-title">
                          Đang <span>Phổ Biến</span>
                        </h5>
                      </div>
                      <div className="post-aside-style-3">
                        {mostPopular.map((article, index) => (
                          <article
                            key={index}
                            className="bg-white border-radius-15 mb-30 p-10 wow fadeIn animated"
                          >
                            <div className="post-thumb d-flex mb-15 border-radius-15 img-hover-scale">
                              <Link
                                to={`/bai-viet/${article.slug}`}
                                style={{ width: "100%" }}
                              >
                                <img
                                  style={{ height: "250px", width: "100%" }}
                                  src={`http://127.0.0.1:3001/${article.image_url}`}
                                />
                              </Link>
                            </div>
                            <div className="pl-10 pr-10">
                              <h5 className="post-title mb-15">
                                <Link to={`/bai-viet/${article.slug}`}>
                                  {article.title}
                                </Link>
                              </h5>
                              <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase mb-10">
                                <span className="post-in">TOP {index + 1}</span>
                                <span className="post-by">
                                  Bởi{" "}
                                  <Link to={`/nguoi-dung/${article.username}`}>
                                    {article.fullname}
                                  </Link>
                                </span>
                                <span className="post-on">
                                  {article.total_views} lượt xem
                                </span>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                    <div className="sidebar-widget p-20 border-radius-15 bg-white widget-latest-comments wow fadeIn animated">
                      <div className="widget-header mb-30">
                        <h5 className="widget-title">
                          Bình Luận <span>Mới</span>
                        </h5>
                      </div>
                      <div className="post-block-list post-module-6">
                        {lastComments.map((comment, index) => (
                          <div
                            key={index}
                            className="last-comment mb-20 d-flex wow fadeIn animated"
                          >
                            <span className="item-count vertical-align">
                              <Link
                                className="red-tooltip author-avatar"
                                to={`/nguoi-dung/${comment.user.username}`}
                                data-toggle="tooltip"
                                data-placement="top"
                                title={comment.user.fullname}
                              >
                                <img
                                  src={`http://127.0.0.1:3001/${comment.user.avatar_url}`}
                                  alt=""
                                />
                              </Link>
                            </span>
                            <div className="alith_post_title_small">
                              <p className="font-medium mb-10">
                                <Link to={`/bai-viet/${comment.article.slug}`}>
                                  {comment.content}
                                </Link>
                              </p>
                              <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase mb-10">
                                <span className="post-by">
                                  Bởi{" "}
                                  <Link
                                    to={`/nguoi-dung/${comment.user.username}`}
                                  >
                                    {comment.user.fullname}
                                  </Link>
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-50 mt-15">
                  <div className="col-md-12">
                    <div className="widget-header position-relative mb-30">
                      <h4 className="widget-title mb-0">
                        From <span>Blog</span>
                      </h4>
                    </div>
                    <div className="post-carausel-2 post-module-1 row">
                      <div className="col">
                        <div className="post-thumb position-relative">
                          <div
                            className="thumb-overlay img-hover-slide border-radius-15 position-relative"
                            style={{
                              backgroundImage:
                                "url(assets/imgs/thumbnail-7.jpg)",
                            }}
                          >
                            <a className="img-link" href="single.html" />
                            <div className="post-content-overlay">
                              <div className="entry-meta meta-0 font-small mb-15">
                                <a href="category.html">
                                  <span className="post-cat bg-success color-white">
                                    Travel
                                  </span>
                                </a>
                              </div>
                              <h5 className="post-title">
                                <a className="color-white" href="single.html">
                                  Tesla’s Cooking Up A New Way To Wire Its Cars,
                                  Report Says
                                </a>
                              </h5>
                              <div className="entry-meta meta-1 font-x-small mt-10 pr-5 pl-5 text-muted">
                                <span>
                                  <span className="mr-5">
                                    <i
                                      className="fa fa-eye"
                                      aria-hidden="true"
                                    />
                                  </span>
                                  5.8k
                                </span>
                                <span className="ml-15">
                                  <span className="mr-5 text-muted">
                                    <i
                                      className="fa fa-comment"
                                      aria-hidden="true"
                                    />
                                  </span>
                                  2.5k
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="post-thumb position-relative">
                          <div
                            className="thumb-overlay img-hover-slide border-radius-15 position-relative"
                            style={{
                              backgroundImage:
                                "url(assets/imgs/thumbnail-8.jpg)",
                            }}
                          >
                            <a className="img-link" href="single.html" />
                            <div className="post-content-overlay">
                              <div className="entry-meta meta-0 font-small mb-15">
                                <a href="category.html">
                                  <span className="post-cat bg-info color-white">
                                    Beauty
                                  </span>
                                </a>
                              </div>
                              <h5 className="post-title">
                                <a className="color-white" href="single.html">
                                  Ratcliffe to be Director of nation talent
                                  Trump ignored
                                </a>
                              </h5>
                              <div className="entry-meta meta-1 font-x-small mt-10 pr-5 pl-5 text-muted">
                                <span>
                                  <span className="mr-5">
                                    <i
                                      className="fa fa-eye"
                                      aria-hidden="true"
                                    />
                                  </span>
                                  5.8k
                                </span>
                                <span className="ml-15">
                                  <span className="mr-5 text-muted">
                                    <i
                                      className="fa fa-comment"
                                      aria-hidden="true"
                                    />
                                  </span>
                                  2.5k
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="post-thumb position-relative">
                          <div
                            className="thumb-overlay img-hover-slide border-radius-15 position-relative"
                            style={{
                              backgroundImage:
                                "url(assets/imgs/thumbnail-10.jpg)",
                            }}
                          >
                            <a className="img-link" href="single.html" />
                            <div className="post-content-overlay">
                              <div className="entry-meta meta-0 font-small mb-15">
                                <a href="category.html">
                                  <span className="post-cat bg-danger color-white">
                                    Art
                                  </span>
                                </a>
                              </div>
                              <h5 className="post-title">
                                <a className="color-white" href="single.html">
                                  Countries seek ‘new history’ as figures are
                                  re-examined
                                </a>
                              </h5>
                              <div className="entry-meta meta-1 font-x-small mt-10 pr-5 pl-5 text-muted">
                                <span>
                                  <span className="mr-5">
                                    <i
                                      className="fa fa-eye"
                                      aria-hidden="true"
                                    />
                                  </span>
                                  5.8k
                                </span>
                                <span className="ml-15">
                                  <span className="mr-5 text-muted">
                                    <i
                                      className="fa fa-comment"
                                      aria-hidden="true"
                                    />
                                  </span>
                                  2.5k
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="post-thumb position-relative">
                          <div
                            className="thumb-overlay img-hover-slide border-radius-15 position-relative"
                            style={{
                              backgroundImage:
                                "url(assets/imgs/thumbnail-15.jpg)",
                            }}
                          >
                            <a className="img-link" href="single.html" />
                            <div className="post-content-overlay">
                              <div className="entry-meta meta-0 font-small mb-10">
                                <a href="category.html">
                                  <span className="post-cat bg-warning color-white">
                                    Gaming
                                  </span>
                                </a>
                              </div>
                              <h5 className="post-title">
                                <a className="color-white" href="single.html">
                                  The secret to moving this ancient sphinx
                                  screening
                                </a>
                              </h5>
                              <div className="entry-meta meta-1 font-x-small mt-10 pr-5 pl-5 text-muted">
                                <span>
                                  <span className="mr-5">
                                    <i
                                      className="fa fa-eye"
                                      aria-hidden="true"
                                    />
                                  </span>
                                  5.8k
                                </span>
                                <span className="ml-15">
                                  <span className="mr-5 text-muted">
                                    <i
                                      className="fa fa-comment"
                                      aria-hidden="true"
                                    />
                                  </span>
                                  2.5k
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="post-thumb position-relative">
                          <div
                            className="thumb-overlay img-hover-slide border-radius-15 position-relative"
                            style={{
                              backgroundImage:
                                "url(assets/imgs/thumbnail-16.jpg)",
                            }}
                          >
                            <a className="img-link" href="single.html" />
                            <div className="post-content-overlay">
                              <div className="entry-meta meta-0 font-small mb-10">
                                <a href="category.html">
                                  <span className="post-cat bg-primary color-white">
                                    Garden
                                  </span>
                                </a>
                              </div>
                              <h5 className="post-title">
                                <a className="color-white" href="single.html">
                                  Harbour amid a Slowen down in singer city
                                  screening
                                </a>
                              </h5>
                              <div className="entry-meta meta-1 font-x-small mt-10 pr-5 pl-5 text-muted">
                                <span>
                                  <span className="mr-5">
                                    <i
                                      className="fa fa-eye"
                                      aria-hidden="true"
                                    />
                                  </span>
                                  5.8k
                                </span>
                                <span className="ml-15">
                                  <span className="mr-5 text-muted">
                                    <i
                                      className="fa fa-comment"
                                      aria-hidden="true"
                                    />
                                  </span>
                                  2.5k
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default TrangChu;
