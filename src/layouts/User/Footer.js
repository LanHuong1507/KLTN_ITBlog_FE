import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ChuyenMucServices from '../../services/ChuyenMucServices';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
    const [categories, setCategories] = useState([]);
    const { theme } = useTheme();
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await ChuyenMucServices.listAll();
                setCategories(response.data.categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const chunkArray = (array, size) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    };

    const categoryChunks = chunkArray(categories, 5);

    return (
        <footer
            className={`footer-area ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}
            style={{
                backgroundColor: theme === 'dark' ? '#121212' : '#f8f9fa',
                color: theme === 'dark' ? 'white' : 'black',
            }}
        >
            <div className="container">
                <div className="row justify-content-center pb-30">
                    {categoryChunks.slice(0, 3).map((chunk, colIndex) => (
                        <div
                            key={`col-${colIndex}`}
                            className="col-md-4 d-flex flex-column align-items-center"
                        >
                            <div className="widget_categories text-center">
                                {chunk.map((category) => (
                                    <span
                                        key={category.category_id}
                                        className="cat-item mb-2"
                                    >
                                        <Link
                                            to={`/chuyen-muc/${category.slug}`}
                                            style={{
                                                color: theme === 'dark' ? 'white' : 'black',
                                            }}
                                        >
                                            {category.name}
                                        </Link>
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div
    className="footer-bottom-area"
    style={{
        backgroundColor: theme === 'dark' ? '#1c1c1c' : '#f8f9fa', // Nền tối đẹp hơn
        color: theme === 'dark' ? '#e0e0e0' : '#6c757d', // Màu chữ rõ ràng
        borderTop: theme === 'dark' ? '1px solid #333' : '1px solid #ddd', // Đường viền trên
        padding: '20px 0', // Tăng khoảng cách
    }}
>
    <div className="container">
        <div className="text-center">
            <div className="footer-copy-right">
                <p
                    className="font-small mb-0"
                    style={{
                        color: theme === 'dark' ? '#d1d1d1' : '#6c757d',
                    }}
                >
                    © {currentYear}, ITBlog | All rights reserved | Created by Huong Tien
                </p>
            </div>
        </div>
    </div>
</div>

        </footer>
    );
};

export default Footer;
