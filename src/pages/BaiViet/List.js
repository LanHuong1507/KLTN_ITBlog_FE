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
  const [searchTerm, setSearchTerm] = useState(''); // Thêm state cho từ khóa tìm kiếm

  const breadcrumbs = [
    { label: 'Trang Chủ', url: '/admin' },
    { label: 'Bài Viết', url: '' },
  ];

  const headers = ["#", "Hình Ảnh", "Tiêu Đề", "Lượt Xem", "Tác Giả", "Trạng Thái", "Phiên Bản", "Hành Động"];

  const fetchData = async (page = 1, search = "") => {
    try {
      const response = await BaiVietServices.list(page, search);
      setData(response.data.articles); // Cập nhật state data với danh sách bài viết
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    }
  };

  useEffect(() => {
    fetchData(currentPage, searchTerm); // Gọi API với từ khóa tìm kiếm
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
      <td><span className="badge badge-success"><i className="fa-regular fa-eye"></i> {item.views.length === 0 ? "0 lượt xem" : `${item.views[0].view_count} lượt xem`}</span></td>
      <td><Link to={`/admin/nguoi-dung/${item.user.username}`}>{item.user.username}</Link></td>
      <td>
        {
          item.privacy === "public" ? 
            <i>Đã Duyệt Bài</i>
          :
            <button className='btn btn-success' onClick={() => handlePublic(item.article_id)}><i className="fa-solid fa-check"></i> Duyệt Bài Viết</button>
        }
      </td>
      <td>
        {
          item.is_draft === true ? 
            <span className="badge badge-danger">Bản Nháp</span>
          :
            <span className="badge badge-primary">Chính Thức</span>
        }
      </td>
      <td>
        <Link to={`/admin/bai-viet/${item.article_id}`} className="btn btn-primary" style={{ color: 'white', marginRight: '5px' }}>
          <i className="fas fa-edit" />
          <span> XEM</span>
        </Link>
        <button className="btn btn-danger" style={{ color: 'white' }} onClick={() => handleDelete(item.article_id)}>
          <i className="fa-solid fa-trash"></i>
          <span> Xóa</span>
        </button>
      </td>
    </>
  );

  // Xử lý duyệt bài viết
  const handlePublic = async (id) => {
    try {
      const response = await BaiVietServices.public(id);
      setData(data.map(item => {
        if (item.article_id === id) {
            // Kiểm tra role và thay đổi
            return { ...item, privacy: "public" };
        }
        return item; 
      }));
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Lỗi khi duyệt bài viết");
    }
  };

  // Xử lý xóa bài viết
  const handleDelete = async (id) => {
    try {
      const destroy = await BaiVietServices.delete(id);
      setData(data.filter(item => item.article_id !== id));
      toast.success(destroy.data.message);
    } catch (error) {
      toast.error("Lỗi khi xóa bài viết");
    }
  };

  // Xử lý khi người dùng thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Xử lý khi người dùng nhập vào ô tìm kiếm
  const handleSearch = (term) => {
    setSearchTerm(term); // Cập nhật từ khóa tìm kiếm
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
        onSearch={handleSearch} // Truyền hàm xử lý tìm kiếm xuống Table
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
