import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import TaiKhoanServices from '../../services/User/TaiKhoanServices'


const NguoiDung = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    const fetchUser = async () => {
        try {
            const response = await TaiKhoanServices.profile();
            setUser(response.data);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/dang-nhap');
        }

        fetchUser();
    }, [navigate]);

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
                                            style={{ width: '90px', height: '90px'}}
                                        />
                                    </a>
                                </div>
                                <div className="author-info">
                                    <h3>
                                        <span className="vcard author">
                                            <span className="fn">
                                                <a href="author.html" title="Posts by Robert" rel="author">
                                                    {user.fullname}
                                                </a>
                                            </span>
                                        </span>
                                    </h3>
                                    <h5 className="text-muted">
                                        <span className="mr-15">{user.email}</span>
                                    </h5>
                                    <div className="author-description">
                                        {user.bio == null ? "Chưa có thông tin giới thiệu." : user.bio}
                                    </div>
                                    <a href="author.html" className="author-bio-link" style={{ textTransform: 'unset' }}>
                                        <span className="mr-5 font-x-small">
                                            <i className="fa-solid fa-user-pen"></i>
                                        </span>
                                        Cập nhật thông tin
                                    </a>
                                    <a href="author.html" className="author-bio-link" style={{ textTransform: 'unset' }}>
                                        <span className="mr-5 font-x-small">
                                            <i className="fa-solid fa-right-from-bracket"></i>
                                        </span>
                                        Đăng xuất
                                    </a>
                                    {

                                    }
                                    <div className="author-social">
                                        <ul className="author-social-icons">
                                            <li className="author-social-link-facebook">
                                                <a href="#" target="_blank">
                                                    <i className="ti-facebook" />
                                                </a>
                                            </li>
                                            <li className="author-social-link-twitter">
                                                <a href="#" target="_blank">
                                                    <i className="ti-twitter-alt" />
                                                </a>
                                            </li>
                                            <li className="author-social-link-pinterest">
                                                <a href="#" target="_blank">
                                                    <i className="ti-pinterest" />
                                                </a>
                                            </li>
                                            <li className="author-social-link-instagram">
                                                <a href="#" target="_blank">
                                                    <i className="ti-instagram" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <h2>Danh sách bài viết</h2>
                            <hr className="wp-block-separator is-style-wide" />
                            <div className="latest-post mb-50">
                                <div className="loop-list-style-1">
                                    <article className="first-post p-10 background-white border-radius-10 mb-30 wow fadeIn animated">
                                        <div className="img-hover-slide border-radius-15 mb-30 position-relative overflow-hidden">
                                            <span className="top-right-icon bg-dark">
                                                <i className="mdi mdi-flash-on" />
                                            </span>
                                            <a href="single.html">
                                                <img src="assets/imgs/news-21.jpg" alt="post-slider" />
                                            </a>
                                        </div>
                                        <div className="pr-10 pl-10">
                                            <div className="entry-meta mb-30">
                                                <a className="entry-meta meta-0" href="category.html">
                                                    <span className="post-in background2 text-primary font-x-small">
                                                        Home decor
                                                    </span>
                                                </a>
                                                <div className="float-right font-small">
                                                    <span>
                                                        <span className="mr-10 text-muted">
                                                            <i className="fa fa-eye" aria-hidden="true" />
                                                        </span>
                                                        5.8k
                                                    </span>
                                                    <span className="ml-30">
                                                        <span className="mr-10 text-muted">
                                                            <i className="fa fa-comment" aria-hidden="true" />
                                                        </span>
                                                        2.5k
                                                    </span>
                                                    <span className="ml-30">
                                                        <span className="mr-10 text-muted">
                                                            <i className="fa fa-share-alt" aria-hidden="true" />
                                                        </span>
                                                        125k
                                                    </span>
                                                </div>
                                            </div>
                                            <h4 className="post-title mb-20">
                                                <span className="post-format-icon">
                                                    <ion-icon name="headset-outline" />
                                                </span>
                                                <a href="single.html">
                                                    Ettitude — Beautifully Designed Bamboo Sheets &amp; Sleep
                                                    Wear-Home Décor Holiday Gift Guide
                                                </a>
                                            </h4>
                                            <p className="post-exerpt font-medium text-muted mb-30">
                                                These people envy me for having a lifestyle they don’t have,
                                                but the truth is, sometimes I envy their lifestyle instead.
                                                Struggling to sell one multi-million dollar home currently.
                                            </p>
                                            <div className="mb-20 overflow-hidden">
                                                <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase">
                                                    <span className="post-by">
                                                        By <a href="author.html">KNICKMEYER</a>
                                                    </span>
                                                    <span className="post-on">18/09/2020 09:35 EST</span>
                                                    <span className="time-reading">12 mins read</span>
                                                    <p className="font-x-small mt-10">
                                                        Updated 18/09/2020 10:28 EST
                                                    </p>
                                                </div>
                                                <div className="float-right">
                                                    <a href="single.html" className="read-more">
                                                        <span className="mr-10">
                                                            <i className="fa fa-thumbtack" aria-hidden="true" />
                                                        </span>
                                                        Picked by Editor
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="p-10 background-white border-radius-10 mb-30 wow fadeIn animated">
                                        <div className="d-md-flex d-block">
                                            <div className="post-thumb post-thumb-big d-flex mr-15 border-radius-15 img-hover-scale">
                                                <a className="color-white" href="single.html">
                                                    <img
                                                        className="border-radius-15"
                                                        src="assets/imgs/thumbnail-15.jpg"
                                                        alt=""
                                                    />
                                                </a>
                                            </div>
                                            <div className="post-content media-body">
                                                <div className="entry-meta mb-15 mt-10">
                                                    <a className="entry-meta meta-2" href="category.html">
                                                        <span className="post-in text-danger font-x-small">
                                                            Politic
                                                        </span>
                                                    </a>
                                                </div>
                                                <h5 className="post-title mb-15 text-limit-2-row">
                                                    <span className="post-format-icon">
                                                        <ion-icon name="videocam-outline" />
                                                    </span>
                                                    <a href="single.html">
                                                        More than 1.5 million people sought state unemployment
                                                        benefits last week even as businesses reopened.
                                                    </a>
                                                </h5>
                                                <p className="post-exerpt font-medium text-muted mb-30 d-none d-lg-block">
                                                    These people envy me for having a lifestyle they don’t have,
                                                    but the truth is, sometimes I envy their lifestyle instead.
                                                    Struggling to sell one multi-million dollar home currently.
                                                </p>
                                                <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase">
                                                    <span className="post-by">
                                                        By <a href="author.html">Sean Boynton</a>
                                                    </span>
                                                    <span className="post-on">15/09/2020 07:00 EST</span>
                                                    <span className="time-reading">12 mins read</span>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </div>
                            <div className="pagination-area mb-30">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-start">
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                <i className="ti-angle-left" />
                                            </a>
                                        </li>
                                        <li className="page-item active">
                                            <a className="page-link" href="#">
                                                01
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                02
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                03
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                04
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                <i className="ti-angle-right" />
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default NguoiDung;