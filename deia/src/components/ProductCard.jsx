import { Link } from 'react-router-dom';
import { formatPrice } from '../services/checkoutService';

const FALLBACK_IMAGE = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400" fill="none"><rect width="400" height="400" fill="#EDE0C9"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="28" letter-spacing="0.35em" fill="#4A2D1B">DEIA</text></svg>'
)}`;

export default function ProductCard({ product }) {
  if (!product) return null;

  const handleImageError = (e) => {
    e.target.src = FALLBACK_IMAGE;
    e.target.alt = `${product.name} - Image unavailable`;
  };

  return (
    <Link to={`/product/${product.slug}`} className="product-card" aria-label={`View ${product.name}`}>
      <div className="product-card-image">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={handleImageError}
        />
        {product.badge && <span className="product-card-badge">{product.badge}</span>}
      </div>
      <div className="product-card-content">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-description">{product.shortDescription}</p>
        <p className="product-card-price">{formatPrice(product.price, product.currency)}</p>
        <span className="product-card-btn">Discover Product</span>
      </div>
    </Link>
  );
}
