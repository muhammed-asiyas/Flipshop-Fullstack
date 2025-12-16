import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import "./index.css";

export default function Footer() {
  return (
    <footer className="footer fade-in">
      <div className="glow-border"></div>

      <div className="footer-container">

        <div className="footer-section">
          <h3 className="footer-logo gradient-text">FlipShop</h3>
          <p className="footer-text">
            Your trusted online store for stylish and affordable products.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link className="link-hover" to="/">Home</Link></li>
            <li><Link className="link-hover" to="/products">Products</Link></li>
            <li><Link className="link-hover" to="/cart">Cart</Link></li>
            <li><Link className="link-hover" to="/login">Login</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><Link className="link-hover" to="/about">About Us</Link></li>
            <li><Link className="link-hover" to="/contact">Contact</Link></li>
            <li><Link className="link-hover" to="/faq">FAQ</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#" className="social-icon fb"> <i className="fab fa-facebook-f"><FaFacebook /></i> </a>
            <a href="#" className="social-icon ig"> <i className="fab fa-instagram"><FaInstagram /></i> </a>
            <a href="#" className="social-icon tw"> <i className="fab fa-twitter"><FaTwitter /></i> </a>
            <a href="#" className="social-icon led"> <i className="fab fa-twitter"><FaLinkedin /></i> </a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} FlipShop. All rights reserved.</p>
      </div>
    </footer>
  );
}