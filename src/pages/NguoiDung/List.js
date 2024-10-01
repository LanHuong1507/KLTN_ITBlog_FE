import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContentHeader from '../../components/ContentHeader';
import Table from '../../components/Table';
import NguoiDungServices from '../../services/NguoiDungServices';
import { toast } from 'react-toastify';

const List = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const breadcrumbs = [
        { label: 'Trang Chủ', url: '/admin' },
        { label: 'Người Dùng', url: '' },
    ];

    const headers = ["#", "Hình Ảnh", "Họ Tên", "Email", "Tài Khoản", "Phân Quyền", "Hành Động"];

    const fetchData = async (page = 1, search = "") => {
        try {
            const response = await NguoiDungServices.list(page, search);
            setData(response.data.users);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };

    useEffect(() => {
        fetchData(currentPage, searchTerm);
        window.scrollTo(0, 0);
    }, [currentPage, searchTerm]);

    const renderRow = (item, index) => (
        <>
            <td>{index + 1}</td>
            <td>
                <img
                    src={`http://127.0.0.1:3001/${item.avatar_url}`}
                    alt={item.fullname}
                    style={{ width: '100px', height: '100px' }}
                />
            </td>
            <td>{item.fullname}</td>
            <td>{item.email}</td>
            <td>{item.username}</td>
            <td>
                {item.role === "admin" 
                    ? <span className="badge badge-danger">Quản trị viên</span> 
                    : <span className="badge badge-success">Người dùng</span>
                }
            </td>
            <td>
                <Link to={`/admin/nguoi-dung/${item.user_id}`} className="btn btn-primary" style={{ color: 'white', marginRight: '5px' }}>
                    <i className="fas fa-edit" />
                    <span> XEM</span>
                </Link>
                {item.role !== "blocked" ? (
                    <button className="btn btn-danger" style={{ color: 'white' }} onClick={() => handleBlock(item.user_id)}>
                        <i className="fa-solid fa-lock"></i>
                        <span> Cấm Tài Khoản</span>
                    </button>
                ) : (
                    <button className="btn btn-success" style={{ color: 'white' }} onClick={() => handleBlock(item.user_id)}>
                        <i className="fa-solid fa-lock-open"></i>
                        <span> Bỏ Cấm</span>
                    </button>
                )}
            </td>
        </>
    );

    const handleBlock = async (id) => {
        const block = await NguoiDungServices.block(id);
        if (block.status === 403) {
            toast.error(block.response.data.message);
            setData(data.map(item => {
                if (item.user_id === id) {
                    return { ...item, role: item.role === "blocked" ? "user" : "blocked" };
                }
                return item;
            }));
        } else {
            toast.success(block.data.message);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <div className="content-wrapper" style={{ minHeight: '100vh' }}>
            <ContentHeader title="Người Dùng" breadcrumbs={breadcrumbs} />
            <div className="table-responsive" style={{ maxHeight: 'none', overflow: 'visible' }}>
                <Table
                    headers={headers}
                    renderRow={renderRow}
                    data={data}
                    onSearch={handleSearch}
                />
            </div>
            <ul className="pagination pagination-sm mr-3 mt-1 float-right">
                {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index}>
                        <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default List;
