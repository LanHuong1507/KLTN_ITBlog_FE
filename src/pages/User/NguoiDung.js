import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import TaiKhoanServices from '../../services/User/TaiKhoanServices'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faRss,
    faAnglesRight,   
    faUserPlus,
    faUserMinus 
} from "@fortawesome/free-solid-svg-icons";

function getShortDescription(content, length = 100) {
    // Loại bỏ các thẻ HTML
    const plainText = content.replace(/<[^>]+>/g, '');
    // Lấy một số ký tự đầu tiên làm mô tả ngắn
    return plainText.length > length ? plainText.substring(0, length) + '...' : plainText;
}
const NguoiDung = () => {
    const { username } = useParams();
    const [user, setUser] = useState({});
    const [followerCount, setFollowerCount] = useState(0);
    const [articles, setArticles] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isFollower, setIsFollower] = useState(false);

    const fetchUser = async () => {
        try {
            const response = await TaiKhoanServices.userByUsername(username);
            setUser(response.data.user);
            setFollowerCount(response.data.followerCount);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    }

    const fetchArticles = async (page = 1) => {
        try {
            const response = await TaiKhoanServices.getArticlesByUsername(username,page);
            setArticles(response.data.articles);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    }

    const fetchFollowed = async () => {
        try {
            const response = await TaiKhoanServices.checkFollowed(username);
            setIsFollower(response.data.isFollowing);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    }


    const handlePageChange = (page) => {
        fetchArticles(page)
    }

    useEffect(() => {
        window.scroll(0, 0);
        if (localStorage.getItem('token')) {
            fetchFollowed();
        }

        fetchUser();
        fetchArticles();
    }, []);
     
    const handelFollow = async () => {
        if (!localStorage.getItem('token')) {
            toast.error("Vui lòng đăng nhập để theo dõi!");
        }else{
            try {
                const response = await TaiKhoanServices.follow(username);
                setIsFollower(!isFollower)
                isFollower === true ? setFollowerCount(followerCount - 1) : setFollowerCount(followerCount + 1);
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        }
    }

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
                                    <Link to="#">
                                        <img
                                            src={`http://127.0.0.1:3001/${user.avatar_url}`}
                                            alt=""
                                            className="avatar"
                                            style={{ width: '90px', height: '90px' }}
                                        />
                                    </Link>
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
                                        {user.bio == null ? "Chưa có thông tin giới thiệu." : user.bio}
                                    </div>
                                    <Link to="#" className="author-bio-link">
                                        <span className="mr-5 font-x-small">
                                        <FontAwesomeIcon icon={faRss} /> 
                                        </span>
                                        {followerCount} người theo dõi
                                    </Link>
                                    <Link to="#" className="author-bio-link" onClick={handelFollow}>
                                        {
                                            isFollower === true ? 
                                                <>
                                                    <span className="mr-5 font-x-small">
                                                    <FontAwesomeIcon icon={faUserMinus} />
                                                    </span>
                                                    Hủy Follow
                                                </>
                                            :
                                                <>
                                                    <span className="mr-5 font-x-small">
                                                    <FontAwesomeIcon icon={faUserPlus} />
                                                    </span>
                                                    Follow
                                                </>
                                        }
                                    </Link>
                                    <div className="author-social">
                                        <ul className="author-social-icons">
                                            <li className="author-social-link-facebook">
                                                <Link to="#">
                                                    <i className="ti-facebook" />
                                                </Link>
                                            </li>
                                            <li className="author-social-link-twitter">
                                                <Link to="#">
                                                    <i className="ti-twitter-alt" />
                                                </Link>
                                            </li>
                                            <li className="author-social-link-pinterest">
                                                <Link to="#">
                                                    <i className="ti-pinterest" />
                                                </Link>
                                            </li>
                                            <li className="author-social-link-instagram">
                                                <Link to="#">
                                                    <i className="ti-instagram" />
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <h2>Danh sách bài viết</h2>
                            <hr className="wp-block-separator is-style-wide" />
                            <div className="latest-post mb-50">
                                <div className="loop-list-style-1">
                                    {articles.map((article, index) => (
                                        index === 0
                                            ?
                                            <article key={index} className="first-post p-10 background-white border-radius-10 mb-30 wow fadeIn animated">
                                                <div className="img-hover-slide border-radius-15 mb-30 position-relative overflow-hidden">
                                                    <span className="top-right-icon bg-dark">
                                                        <i className="mdi mdi-flash-on" />
                                                    </span>
                                                    <Link to={`/bai-viet/${article.slug}`}>
                                                        <img style={{ height: '380px', width: '100%' }} src={`http://127.0.0.1:3001/${article.image_url}`} alt="post-slider" />
                                                    </Link>
                                                </div>
                                                <div className="pr-10 pl-10">
                                                    <h4 className="post-title mb-20">
                                                        <Link to={`/bai-viet/${article.slug}`}>
                                                            {article.title}
                                                        </Link>
                                                    </h4>
                                                    <p className="post-exerpt font-medium text-muted mb-30">
                                                        {
                                                            getShortDescription(article.content, 150)
                                                        }
                                                    </p>
                                                    <div className="mb-20 overflow-hidden">
                                                        <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase">
                                                            <span className="post-by">
                                                                Đăng bởi <Link to="#">{user.fullname}</Link>
                                                            </span>
                                                            <span className="post-on">
                                                                {
                                                                    new Date(article.createdAt).toLocaleDateString('vi-VN')
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="float-right">
                                                            <Link to={`/bai-viet/${article.slug}`}>
                                                                <span className="mr-10">
                                                                <FontAwesomeIcon icon={faAnglesRight} />
                                                                </span>
                                                                ĐỌC THÊM
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                                            :
                                            <article key={index} className="p-10 background-white border-radius-10 mb-30 wow fadeIn animated">
                                                <div className="d-md-flex d-block">
                                                    <div className="post-thumb post-thumb-big d-flex mr-15 border-radius-15 img-hover-scale">
                                                        <Link className="color-white" to={`/bai-viet/${article.slug}`}>
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
                                                                    {
                                                                        new Date(article.createdAt).toLocaleDateString('vi-VN')
                                                                    }
                                                                </span>
                                                            </Link>
                                                        </div>
                                                        <h5 className="post-title mb-15 text-limit-2-row">
                                                            <Link to={`/bai-viet/${article.slug}`}>
                                                                {article.title}
                                                            </Link>
                                                        </h5>
                                                        <p className="post-exerpt font-medium text-muted mb-30 d-none d-lg-block">
                                                            {
                                                                getShortDescription(article.content, 150)
                                                            }
                                                        </p>
                                                        <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase">
                                                            <span className="post-by">
                                                                Đăng bởi <Link to="#">{user.fullname}</Link>
                                                            </span>
                                                            <Link to={`/bai-viet/${article.slug}`}>
                                                                <span className="mr-10">
                                                                <FontAwesomeIcon icon={faAnglesRight} /> Xem Thêm 
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                                    ))}
                                </div>
                            </div>
                            {
                                articles.length !== 0
                                    ?
                                    <div className="pagination-area mb-30">
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination justify-content-start">
                                                {Array.from({ length: totalPages }, (_, index) => (
                                                    <li key={index} className="page-item active">
                                                        <a className="page-link" onClick={() => handlePageChange(index + 1)}>
                                                            {index + 1}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </nav>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default NguoiDung;