import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ChuyenMucServices from '../../services/ChuyenMucServices';

const Footer = () => {
    const [categories, setCategories] = useState([]);

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

    const currentYear = new Date().getFullYear();
    const firstRowCategories = categories.slice(0, 6); 
    const secondRowCategories = categories.slice(6, 10); 

    return (
        <footer className="footer-area">
            <div className="container">
                <div className="row justify-content-center pb-30">
                    <div className="col-md-12">
                        <div className="widget_categories text-center">
                            {firstRowCategories.map((category, index) => (
                                <span key={category.category_id} className="cat-item">
                                   <Link to={`/chuyen-muc/${category.slug}`}>{category.name}</Link>
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
                                    <Link to={`/chuyen-muc/${category.slug}`}>{category.name}</Link>
                                    {index < secondRowCategories.length - 1 && <span className="separator"> || </span>}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom-area text-muted">
                <div className="container">
                    <div className="text-center">
                        <div className="footer-copy-right">
                            <p className="font-small text-muted mb-0"> 
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
