import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';

const SHOP_PRODUCTS = [
  { name: 'Sandalwood Logs', path: '/product/sandalwood-logs' },
  { name: 'Sandalwood Oil', path: '/product/sandalwood-oil' },
  { name: 'Rose Water', path: '/product/rose-water' },
  { name: 'Sandalwood Powder', path: '/product/sandalwood-powder' },
  { name: 'Sandalwood Agarbatti', path: '/product/agarbatti' },
];

export default function Navbar({ onSearchOpen }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);
  const location = useLocation();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
    setMobileShopOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (shopDropdownOpen) setShopDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, shopDropdownOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setShopDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setShopDropdownOpen(false);
    }, 150);
  };

  const isLinkActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <div className="navbar-brand">
          <Link
            to="/"
            className="navbar-logo"
            aria-label="DEIA - Rooted in Tradition"
            style={{ letterSpacing: '0.35em' }}
          >
            DEIA
          </Link>
        </div>

        <nav className="navbar-nav desktop-nav" aria-label="Main Navigation">
          <ul className="navbar-links">
            <li className="navbar-item">
              <Link
                to="/"
                className={`navbar-link ${isLinkActive('/') ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>

            <li
              className="navbar-item navbar-dropdown-wrapper"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="navbar-dropdown-trigger-container">
                <Link
                  to="/shop"
                  className={`navbar-link ${isLinkActive('/shop') || isLinkActive('/product') ? 'active' : ''}`}
                  aria-expanded={shopDropdownOpen}
                  aria-haspopup="true"
                >
                  Shop
                </Link>
                <button
                  type="button"
                  className="navbar-dropdown-arrow-btn"
                  onClick={() => setShopDropdownOpen((prev) => !prev)}
                  aria-label="Toggle shop submenu"
                  aria-expanded={shopDropdownOpen}
                >
                  <ChevronDown
                    size={16}
                    className={`dropdown-chevron ${shopDropdownOpen ? 'open' : ''}`}
                  />
                </button>
              </div>

              {shopDropdownOpen && (
                <div
                  className="navbar-dropdown-menu"
                  role="menu"
                  aria-label="Shop categories and products"
                >
                  <div className="navbar-dropdown-header">
                    <Link
                      to="/shop"
                      className="navbar-dropdown-view-all"
                      onClick={() => setShopDropdownOpen(false)}
                      role="menuitem"
                    >
                      View All Products
                    </Link>
                  </div>
                  <ul className="navbar-dropdown-list">
                    {SHOP_PRODUCTS.map((prod) => (
                      <li key={prod.path} role="none">
                        <Link
                          to={prod.path}
                          className="navbar-dropdown-item"
                          onClick={() => setShopDropdownOpen(false)}
                          role="menuitem"
                        >
                          {prod.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            <li className="navbar-item">
              <Link
                to="/our-story"
                className={`navbar-link ${isLinkActive('/our-story') ? 'active' : ''}`}
              >
                Our Story
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                to="/ingredients"
                className={`navbar-link ${isLinkActive('/ingredients') ? 'active' : ''}`}
              >
                Ingredients
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                to="/contact"
                className={`navbar-link ${isLinkActive('/contact') ? 'active' : ''}`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="navbar-actions">
          <button
            type="button"
            className="navbar-action-btn navbar-search-btn"
            onClick={onSearchOpen}
            aria-label="Open search"
          >
            <Search size={20} />
          </button>

          <button
            type="button"
            className="navbar-action-btn navbar-user-btn"
            aria-label="User account"
            title="Account"
          >
            <User size={20} />
          </button>

          <Link
            to="/cart"
            className="navbar-action-btn navbar-cart-btn"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="cart-count" aria-hidden="true">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="navbar-action-btn hamburger"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`navbar-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="navbar-mobile-content">
          <ul className="navbar-mobile-links">
            <li className="navbar-mobile-item">
              <Link
                to="/"
                className={`navbar-mobile-link ${isLinkActive('/') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>

            <li className="navbar-mobile-item">
              <div className="navbar-mobile-accordion-header">
                <Link
                  to="/shop"
                  className={`navbar-mobile-link ${isLinkActive('/shop') || isLinkActive('/product') ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Shop
                </Link>
                <button
                  type="button"
                  className="navbar-mobile-accordion-toggle"
                  onClick={() => setMobileShopOpen((prev) => !prev)}
                  aria-expanded={mobileShopOpen}
                  aria-label="Toggle shop products submenu"
                >
                  <ChevronDown
                    size={20}
                    className={`dropdown-chevron ${mobileShopOpen ? 'open' : ''}`}
                  />
                </button>
              </div>

              {mobileShopOpen && (
                <ul className="navbar-mobile-sublinks">
                  <li className="navbar-mobile-subitem">
                    <Link
                      to="/shop"
                      className="navbar-mobile-sublink"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      All Products
                    </Link>
                  </li>
                  {SHOP_PRODUCTS.map((prod) => (
                    <li key={prod.path} className="navbar-mobile-subitem">
                      <Link
                        to={prod.path}
                        className="navbar-mobile-sublink"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {prod.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li className="navbar-mobile-item">
              <Link
                to="/our-story"
                className={`navbar-mobile-link ${isLinkActive('/our-story') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Our Story
              </Link>
            </li>

            <li className="navbar-mobile-item">
              <Link
                to="/ingredients"
                className={`navbar-mobile-link ${isLinkActive('/ingredients') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Ingredients
              </Link>
            </li>

            <li className="navbar-mobile-item">
              <Link
                to="/contact"
                className={`navbar-mobile-link ${isLinkActive('/contact') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
