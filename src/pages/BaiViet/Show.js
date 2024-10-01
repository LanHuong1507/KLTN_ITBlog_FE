import React, { useState, useEffect } from 'react';
import ContentHeader from '../../components/ContentHeader';
import { Link, useNavigate } from 'react-router-dom';
import BaiVietServices from '../../services/BaiVietServices'; 
import ChungServices from '../../services/ChungServices';
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

const Show = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState(''); 
  const [tags, setTags] = useState(''); 
  const [image, setImage] = useState(null);
  const [content, setContent] = useState(''); 
  const [isDraft, setIsDraft] = useState(false);
  const [categories, setCategories] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate(); 
  const { id } = useParams();

  const breadcrumbs = [
    { label: 'Trang Chủ', url: '/' },
    { label: 'Bài Viết', url: '/admin/bai-viet' },
    { label: 'Chỉnh Sửa', url: '' },
  ];

  // Hàm chuyển đổi tiêu đề thành slug
  const createSlug = (title) => {
    const vietnameseToAscii = (str) => {
      const map = {
        'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
        'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
        'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
        'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
        'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
        'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
        'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
        'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
        'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
        'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
        'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
        'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
        'đ': 'd',
      };
      return str.replace(/./g, char => map[char] || char);
    };
  
    return vietnameseToAscii(title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric characters with hyphen
      .replace(/(^-|-$)/g, '');     // Remove hyphen from start or end
  };

  const getCategories = async () => {
    const response = await ChungServices.list_categories();
    const categoriesOptions = response.data.categories.map((category) => ({
      value: category.category_id,
      label: category.name,
    }));
    setCategories(categoriesOptions);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const detail = await BaiVietServices.detail(id);
        if (detail.status === 200) {
          setTitle(detail.data.article.title);
          setSlug(detail.data.article.slug);
          setTags(detail.data.article.tags);
          setContent(detail.data.article.content);
          setIsDraft(detail.data.article.is_draft);
  
          const categories = detail.data.categories || [];
          const selectedCategoriesDefault = categories.map((category) => ({
            value: category.category_id,
            label: category.name,
          }));
          setSelectedCategories(selectedCategoriesDefault);
        } else {
          navigate('/admin/bai-viet');
        }
      } catch (error) {
        console.error("Error fetching data", error);
        navigate('/admin/bai-viet');
      }
    };
  
    fetchData();
    getCategories();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  // Title onChange event to dynamically update title and slug
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(createSlug(newTitle)); // Automatically generate slug when title changes
  };

  const handleSubmit = async (e, is_draft = 0) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('slug', slug);
    formData.append('tags', tags);
    formData.append('is_draft', is_draft);
    formData.append('image_url', image);
    formData.append('content', content); 
    formData.append("categories", JSON.stringify(selectedCategories));
    
    const addArticle = await BaiVietServices.update(id, formData);

    if (addArticle.status === 200) {
      if(is_draft === 1){
        setIsDraft(true);
        toast.success("Đã lưu bản nháp bài viết");
      } else {
        setIsDraft(false);
        toast.success(addArticle.data.message);
      }
    } else {
      toast.error(addArticle.response.data.message);
    }
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
  };

  return (
    <div className="content-wrapper" style={{ minHeight: '1203.31px' }}>
      <ContentHeader title='Chỉnh Sửa' breadcrumbs={breadcrumbs} />
      <section className="content">
        <div className="container-fluid">
          <div className='row'>
            <div className='col-md-8'>
              <div className="card card-default">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <CKEditor
                          editor={ClassicEditor}
                          data={content || ''}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setContent(data);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className="card card-default">
                <div className="card-body">
                  <div className="row mb-2">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="title">Tiêu Đề</label>
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          name="title"
                          placeholder="Tiêu Đề"
                          value={title}
                          onChange={handleTitleChange} // Update slug when title changes
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="slug">Đường Dẫn</label>
                        <input
                          type="text"
                          className="form-control"
                          id="slug"
                          name="slug"
                          placeholder="Đường dẫn"
                          value={slug}
                          onChange={(e) => setSlug(e.target.value)} // Allow manual changes if needed
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="tags">Từ Khóa</label>
                        <input
                          type="text"
                          className="form-control"
                          id="tags"
                          name="tags"
                          placeholder="Từ khóa cách bởi dấu ,"
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="categories">Chọn Danh Mục</label>
                        <Select
                          isMulti
                          name="categories"
                          options={categories}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          value={selectedCategories}
                          onChange={handleCategoryChange}
                          placeholder="Chọn danh mục"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="image">Hình Ảnh</label>
                        <input
                          type="file"
                          className="form-control"
                          id="image"
                          name="image"
                          onChange={(e) => setImage(e.target.files[0])}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="tags">Phiên Bản</label>
                        <input
                          type="text"
                          className="form-control bg-white"
                          id="draft"
                          name="draft"
                          value={isDraft ? "Bản Nháp" : "Chính Thức"}
                          required
                          disabled
                          style={{ cursor: "not-allowed" }}
                        />
                      </div>
                    </div>
                  </div>
                  <Link className="btn btn-success mr-2" to="/admin/bai-viet">
                    Quay Lại
                  </Link>
                  <button
                    className="btn btn-info mr-2"
                    onClick={(e) => handleSubmit(e, 1)}
                  >
                    Lưu Bản Nháp
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Đăng Bài Viết
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Show;
