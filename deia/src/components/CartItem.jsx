import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../services/checkoutService';

const FALLBACK_IMAGE = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none"><rect width="120" height="120" fill="#EDE0C9"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="16" letter-spacing="0.2em" fill="#4A2D1B">DEIA</text></svg>'
)}`;

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  if (!item) return null;

  const handleDecrease = () => {
    if (item.quantity <= 1) {
      removeFromCart(item.id, item.selectedSize, item.selectedWeight);
    } else {
      updateQuantity(item.id, item.quantity - 1, item.selectedSize, item.selectedWeight);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedWeight);
  };

  const handleRemove = () => {
    removeFromCart(item.id, item.selectedSize, item.selectedWeight);
  };

  const handleImageError = (e) => {
    e.target.src = FALLBACK_IMAGE;
    e.target.alt = `${item.name} - Image unavailable`;
  };

  const lineTotal =
    item.price !== null && item.price !== undefined
      ? item.price * item.quantity
      : null;

  const variantText = [item.selectedSize, item.selectedWeight]
    .filter(Boolean)
    .join(' / ');

  return (
    <div className="cart-item">
      <Link
        to={`/product/${item.slug}`}
        className="cart-item-image-link"
        aria-label={`View ${item.name}`}
      >
        <img
          src={item.image}
          alt={item.name}
          className="cart-item-image"
          onError={handleImageError}
          loading="lazy"
        />
      </Link>

      <div className="cart-item-content">
        <div className="cart-item-header">
          <Link to={`/product/${item.slug}`} className="cart-item-title-link">
            <h4 className="cart-item-name">{item.name}</h4>
          </Link>
          <button
            type="button"
            className="cart-item-remove-btn"
            onClick={handleRemove}
            aria-label={`Remove ${item.name} from cart`}
          >
            <Trash2 size={16} />
          </button>
        </div>

        {variantText && (
          <p className="cart-item-variant">
            <span className="cart-item-variant-label">Option: </span>
            <span className="cart-item-variant-value">{variantText}</span>
          </p>
        )}

        <p className="cart-item-unit-price">
          {formatPrice(item.price, item.currency)}
        </p>

        <div className="cart-item-actions">
          <div className="cart-quantity-selector" role="group" aria-label="Item quantity">
            <button
              type="button"
              className="cart-quantity-btn"
              onClick={handleDecrease}
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="cart-quantity-display" aria-live="polite">
              {item.quantity}
            </span>
            <button
              type="button"
              className="cart-quantity-btn"
              onClick={handleIncrease}
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="cart-item-total-price">
            <span className="cart-item-total-label">Total: </span>
            <span className="cart-item-total-value">
              {formatPrice(lineTotal, item.currency)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
