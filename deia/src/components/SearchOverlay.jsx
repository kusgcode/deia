import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search } from 'lucide-react';
import { searchProducts, products } from '../data/products';

const FALLBACK_IMAGE = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" fill="#EDE0C9"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="16" letter-spacing="0.2em" fill="#4A2D1B">DEIA</text></svg>'
)}`;

export default function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const trimmedQuery = query.trim();
  const displayedProducts = trimmedQuery ? searchProducts(trimmedQuery) : products;

  const handleSelectProduct = (slug) => {
    navigate(`/product/${slug}`);
    onClose();
  };

  const handleImageError = (e, name) => {
    e.target.src = FALLBACK_IMAGE;
    e.target.alt = `${name} - Image unavailable`;
  };

  return (
    <div
      className="search-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Search Products"
    >
      <div className="search-overlay-backdrop" onClick={onClose} />

      <div className="search-overlay-dialog">
        <div className="search-overlay-header">
          <div className="search-input-wrapper">
            <Search size={22} className="search-input-icon" aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              className="search-overlay-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sandalwood, rose water, incense..."
              aria-label="Search query"
            />
          </div>
          <button
            type="button"
            className="search-overlay-close"
            onClick={onClose}
            aria-label="Close search"
          >
            <X size={24} />
          </button>
        </div>

        <div className="search-overlay-body">
          <div className="search-results-section">
            <h4 className="search-results-header">
              {trimmedQuery
                ? `Results for "${trimmedQuery}" (${displayedProducts.length})`
                : 'Suggested Creations'}
            </h4>

            {displayedProducts.length > 0 ? (
              <ul className="search-overlay-results">
                {displayedProducts.map((product) => (
                  <li key={product.id} className="search-result-item-wrapper">
                    <button
                      type="button"
                      className="search-result-item"
                      onClick={() => handleSelectProduct(product.slug)}
                    >
                      <div className="search-result-image-wrapper">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="search-result-image"
                          onError={(e) => handleImageError(e, product.name)}
                          loading="lazy"
                        />
                      </div>
                      <div className="search-result-info">
                        <h5 className="search-result-title">{product.name}</h5>
                        <p className="search-result-desc">{product.shortDescription}</p>
                        <span className="search-result-category">{product.category}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="search-empty-state">
                <p className="search-empty-title">No products found</p>
                <p className="search-empty-hint">
                  We couldn&apos;t find anything matching &ldquo;{query}&rdquo;. Try searching for sandalwood, rose water, or incense.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
