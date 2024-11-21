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
                const response = await ChuyenMucServices.list(); 
                setCategories(response.data.categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const firstRowCategories = categories.slice(0, 6); 
    const secondRowCategories = categories.slice(6, 10); 

    return (
        <footer
            className={`footer-area ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}  // Apply dynamic class based on theme
            style={{
                backgroundColor: theme === 'dark' ? '#121212' : '#f8f9fa',  // Change background color based on theme
                color: theme === 'dark' ? 'white' : 'black',  // Change text color based on theme
            }}
        >
            <div className="container">
                <div className="row justify-content-center pb-30">
                    <div className="col-md-12">
                        <div className="widget_categories text-center">
                            {firstRowCategories.map((category, index) => (
                                <span key={category.category_id} className="cat-item">
                                   <Link to={`/chuyen-muc/${category.slug}`} style={{ color: theme === 'dark' ? 'white' : 'black' }}>
                                       {category.name}
                                   </Link>
                                    {index < firstRowCategories.length - 1 && <span className="separator"> || </span>} 
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center pb-30">
                    <div className="col-md-12">
                        <div className="widget_categories text-center">
                            {secondRowCategories.map((category, index) => (
                                <span key={category.category_id} className="cat-item">
                                    <Link to={`/chuyen-muc/${category.slug}`} style={{ color: theme === 'dark' ? 'white' : 'black' }}>
                                        {category.name}
                                    </Link>
                                    {index < secondRowCategories.length - 1 && <span className="separator"> || </span>}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div
    className="footer-bottom-area text-muted"
    style={{
        backgroundColor: theme === 'dark' ? 'white' : '#f8f9fa', 
        color: theme === 'dark' ? 'black' : 'text-muted',
    }}
>
    <div className="container">
        <div className="text-center">
            <div className="footer-copy-right">
                <p className="font-small mb-0">
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
