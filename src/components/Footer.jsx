import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Luxe.</h3>
                    <p>Redefining modern aesthetics with premium quality.</p>
                </div>
                <div className="footer-section">
                    <h4>Shop</h4>
                    <ul>
                        <li><Link to="/shop">All Products</Link></li>
                        <li><Link to="/shop">New Arrivals</Link></li>
                        <li><Link to="/shop">Accessories</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Company</h4>
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/terms">Terms & Conditions</Link></li>
                        <li><Link to="/admin/login">Admin Login</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Connect</h4>
                    <div className="social-links">
                        <a href="#">Instagram</a>
                        <a href="#">Twitter</a>
                        <a href="#">Facebook</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Luxe Ecommerce. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
