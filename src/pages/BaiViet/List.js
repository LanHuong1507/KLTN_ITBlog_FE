import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContentHeader from '../../components/ContentHeader';
import Table from '../../components/Table';
import BaiVietServices from '../../services/BaiVietServices';
import { toast } from 'react-toastify';

const List = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const breadcrumbs = [
    { label: 'Trang Chủ', url: '/admin' },
    { label: 'Bài Viết', url: '' },
  ];

  const headers = ["#", "Hình Ảnh", "Tiêu Đề", "Lượt Xem", "Tác Giả", "Trạng Thái", "Phiên Bản", "Hành Động"];

  const fetchData = async (page = 1, search = "") => {
    try {
      const response = await BaiVietServices.list(page, search);
      setData(response.data.articles);
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
          src={`http://127.0.0.1:3001/${item.image_url}`}
          alt={item.title}
          style={{ width: '200px', height: '100px' }}
        />
      </td>
      <td>{item.title}</td>
      <td>
        <span className="badge badge-success">
          <i className="fa-regular fa-eye"></i> {item.views.length === 0 ? "0 lượt xem" : `${item.views[0].view_count} lượt xem`}
        </span>
      </td>
      <td>
        <Link to={`/admin/nguoi-dung/${item.user.username}`}>{item.user.username}</Link>
      </td>
      <td>
        {item.privacy === "public" ? 
          <span className="badge badge-primary">Đã Duyệt Bài</span>
          :
          <button 
            className='btn btn-success btn-sm d-flex align-items-center' 
            style={{ padding: '4px 8px' }} 
            onClick={() => handlePublic(item.article_id)} 
          >
            <i className="fa-solid fa-check" style={{ marginRight: '5px' }}></i> 
            Duyệt
          </button>
        }
      </td>
      <td>
        {item.is_draft === true ? 
          <span className="badge badge-danger">Bản Nháp</span>
          :
          <span className="badge badge-primary">Chính Thức</span>
        }
      </td>
      <td>
        <div className="d-flex justify-content-between align-items-center">
          <Link 
            to={`/admin/bai-viet/${item.article_id}`} 
            className="btn btn-primary btn-sm d-flex align-items-center"
            style={{ marginRight: '5px', padding: '4px 8px' }}
          >
            <i className="fas fa-edit" style={{ marginRight: '5px' }}></i>
            XEM
          </Link>
          <button 
            className="btn btn-danger btn-sm d-flex align-items-center"
            style={{ padding: '4px 8px' }}
            onClick={() => handleDelete(item.article_id)}
          >
            <i className="fa-solid fa-trash" style={{ marginRight: '5px' }}></i>
            Xóa
          </button>
        </div>
      </td>
    </>
  );

  const handlePublic = async (id) => {
    try {
      const response = await BaiVietServices.public(id);
      setData(data.map(item => {
        if (item.article_id === id) {
          return { ...item, privacy: "public", is_draft: 0 };
        }
        return item; 
      }));
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Lỗi khi duyệt bài viết");
    }
  };

  const handleDelete = async (id) => {
    try {
      const destroy = await BaiVietServices.delete(id);
      setData(data.filter(item => item.article_id !== id));
      toast.success(destroy.data.message);
    } catch (error) {
      toast.error("Lỗi khi xóa bài viết");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="content-wrapper" style={{ minHeight: '1203.31px' }}>
      <ContentHeader title="Bài Viết" breadcrumbs={breadcrumbs} />
      <Table 
        headers={headers} 
        renderRow={renderRow} 
        data={data} 
        addPath="/admin/bai-viet/them/" 
        addText="Thêm Bài Viết" 
        onSearch={handleSearch}
      />
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
