import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Page404 = () => {
    useEffect(() => {
        window.scroll(0,0); 
    }, []);

    return (
        <>
            <main className="position-relative">
                <div className="container">
                    <div className="row mb-30">
                        <div className="col-12">
                            <div className="content-404 text-center mb-30">
                                <h1 className="mb-30">404</h1>
                                <p>Trang bạn tìm kiếm hiện không tồn tại.</p>
                                <p className="text-muted">Có thể bạn đã nhập sai địa chỉ hoặc đã sử dụng liên kết lỗi thời hoặc trang đó đã bị xóa :)</p>
                                <h6 className="mt-30 mb-15">
                                    <Link to="/">Quay Về Trang Chủ</Link>
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Page404;