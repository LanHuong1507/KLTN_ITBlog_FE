import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ChuyenMucServices from '../../services/ChuyenMucServices';

const Footer = () => {
    const [categories, setCategories] = useState([]);
    const columns = 4; // Set the desired number of columns here (4 or 5)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await ChuyenMucServices.list(); // Fetch all categories
                setCategories(response.data.categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    // Calculate items per column based on the total categories and number of columns
    const itemsPerColumn = Math.ceil(categories.length / columns);
    const currentYear = new Date().getFullYear(); // Get the current year

    return (
        <footer>
            <div className="footer-area pt-50 bg-white">
                <div className="container">
                    <div className="row pb-30">
                        {Array.from({ length: columns }, (_, colIndex) => (
                            <div className="col" key={colIndex}>
                                <ul className="float-left mr-30 font-medium widget_categories">
                                    {categories.slice(colIndex * itemsPerColumn, (colIndex + 1) * itemsPerColumn).map(category => (
                                        <li 
                                            key={category.category_id} 
                                            className="cat-item" 
                                        >
                                            <Link to={`/chuyen-muc/${category.slug}`}>{category.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="footer-bottom-area bg-white text-muted">
                <div className="container">
                    <div className="footer-border pt-20 pb-20 text-center">
                        <div className="footer-copy-right">
                            <p className="font-small text-muted mb-0"> 
                                © {currentYear}, ITBlog| All rights reserved | Created by Huong Tien
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
