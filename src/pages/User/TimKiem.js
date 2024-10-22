import { useEffect, useState } from 'react';
import TrangChuServices from '../../services/User/TrangChuServices'
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

function getShortDescription(content, length = 100) {
    // Loại bỏ các thẻ HTML
    const plainText = content.replace(/<[^>]+>/g, '');
    // Lấy một số ký tự đầu tiên làm mô tả ngắn
    return plainText.length > length ? plainText.substring(0, length) + '...' : plainText;
}


const TimKiem = () => {
    const [articles, setArticles] = useState([])
    const [totalPages, setTotalPages] = useState(1);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get('s');

    const fetchArticles = async (page = 1) => {
        try {
            const response = await TrangChuServices.getListArticles(page, search);
            setArticles(response.data.articles);
            setTotalPages(response.data.totalPages)
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    }

    useEffect(() => {
        fetchArticles();
    }, [search]);

    const handlePageChange = (page) => {
        fetchArticles(page);
        window.scroll(0,0); 
    }

    return (
        <>
            <main className="position-relative">
                <div className="archive-header text-center mb-50">
                    <div className="archive-header text-center mb-50">
                        <div className="container">
                            <h2>
                                <span className="text-success">Tìm kiếm cho "{search}"</span>
                            </h2>
                            <div className="breadcrumb">
                                {
                                    articles.length === 0 ?
                                    <span className="no-arrow">Không tìm thấy bài viết nào</span>
                                    :
                                    <span className="no-arrow">tìm thấy {totalPages * 6} bài viết dành cho bạn</span>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-9 order-1 order-md-2">
                            <div className="row mb-50">
                                <div className="col-lg-8 col-md-12">
                                    <div className={articles.length === 0 ? "latest-post" : "latest-post mb-50"}>
                                        <div className="loop-list-style-1">
                                            {articles.map((article, index) => (
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
                                                                    Đăng bởi <Link to={`/nguoi-dung/${article.username}`}>{article.fullname}</Link>
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
                                <div className={articles.length === 0 ? "col-lg-12 col-md-12 sidebar-right" : "col-lg-4 col-md-12 sidebar-right"}>
                                    <div
                                        className="sidebar-widget p-20 border-radius-15 bg-white widget-text wow fadeIn animated"
                                        style={{ visibility: "visible", animationName: "fadeIn" }}
                                    >
                                        <div className="widget-header mb-30">
                                            <h5 className="widget-title">
                                                Mẹo <span>tìm kiếm</span>
                                            </h5>
                                        </div>
                                        <div>
                                            <h6>1. Sử dụng các tab</h6>
                                            <p className="font-small text-muted">
                                                Đầu tiên, hãy tận dụng các tab khi tìm kiếm trên Google. Ở trên thanh tìm kiếm sẽ có các tab như Web, Hình ảnh, Tin tức... Bạn có thể chọn tab phù hợp để Google tập trung vào kiểu nội dung bạn cần.
                                            </p>
                                            <h6>2. Sử dụng dấu ngoặc kép</h6>
                                            <p className="font-small text-muted">
                                                Khi bạn cần tìm kiếm chính xác một cụm từ nào đó, hãy dùng dấu ngoặc kép. Điều này sẽ giúp Google chỉ tìm kiếm những kết quả chứa chính xác cụm từ bạn muốn, giúp tiết kiệm thời gian và cho ra kết quả chính xác hơn.
                                            </p>
                                            <h6>3. Loại trừ từ với dấu gạch ngang</h6>
                                            <p className="font-small text-muted">
                                                Đôi khi bạn muốn tìm kiếm một từ nhưng lại có quá nhiều nghĩa. Ví dụ, khi tìm "Mustang", bạn có thể nhận được kết quả về xe Ford hoặc loài ngựa hoang. Để loại trừ một trong hai, hãy thêm dấu gạch ngang trước từ bạn muốn bỏ qua, như "Mustang -xe" hoặc "Mustang -ngựa".
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default TimKiem;