import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col footer-col-brand">
            <Link
              to="/"
              className="footer-logo"
              style={{ letterSpacing: '0.35em' }}
              aria-label="DEIA - Home"
            >
              DEIA
            </Link>
            <p className="footer-description">
              Traditional Indian products rooted in heritage. Sandalwood, rose water, incense, and thoughtfully selected essentials for everyday living.
            </p>
          </div>

          {/* Explore Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="footer-link">Shop All</Link>
              </li>
              <li>
                <Link to="/our-story" className="footer-link">Our Story</Link>
              </li>
              <li>
                <Link to="/ingredients" className="footer-link">Ingredients</Link>
              </li>
            </ul>
          </div>

          {/* Customer Support Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Customer Support</h4>
            <ul className="footer-links">
              <li>
                <Link to="/contact" className="footer-link">Contact</Link>
              </li>
              <li>
                <Link to="/shipping-and-returns" className="footer-link">Shipping & Returns</Link>
              </li>
            </ul>
          </div>

          {/* Policies Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Policies</h4>
            <ul className="footer-links">
              <li>
                <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="footer-link">Terms and Conditions</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} DEIA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
