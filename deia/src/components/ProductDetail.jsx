import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../services/checkoutService';
import { getRelatedProducts } from '../data/products';
import ProductCard from './ProductCard';

const FALLBACK_IMAGE = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600" fill="none"><rect width="600" height="600" fill="#EDE0C9"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="36" letter-spacing="0.35em" fill="#4A2D1B">DEIA</text></svg>'
)}`;

export default function ProductDetail({ product }) {
  if (!product) {
    return (
      <div className="product-detail-empty">
        <p>Product not found.</p>
        <Link to="/shop" className="product-detail-back-link">
          Return to Shop
        </Link>
      </div>
    );
  }

  return <ProductDetailContent product={product} />;
}

// Hooks live here so they are never called conditionally.
function ProductDetailContent({ product }) {
  const { addToCart } = useCart();

  const galleryList =
    product.galleryImages && product.galleryImages.length > 0
      ? product.galleryImages
      : [product.image];

  const [selectedImage, setSelectedImage] = useState(galleryList[0] || product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [selectedWeight, setSelectedWeight] = useState(product.weights?.[0] || null);
  const [selectedPackSize, setSelectedPackSize] = useState(product.packSizes?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Define tab configuration based on available non-empty product content
  const tabs = [
    { id: 'details', label: 'Details', content: product.details },
    { id: 'ingredients', label: 'Ingredients', content: product.ingredients },
    { id: 'usage', label: 'How to Use', content: product.usageInstructions },
    { id: 'storage', label: 'Storage', content: product.storageInstructions },
    { id: 'safety', label: 'Safety', content: product.safetyInformation }
  ].filter((t) => Array.isArray(t.content) && t.content.length > 0);

  const [activeTab, setActiveTab] = useState(tabs[0]?.id || 'details');

  // Synchronize state when product changes
  useEffect(() => {
    setSelectedImage(galleryList[0] || product.image);
    setSelectedSize(product.sizes?.[0] || null);
    setSelectedWeight(product.weights?.[0] || null);
    setSelectedPackSize(product.packSizes?.[0] || null);
    setQuantity(1);
    setAdded(false);
    setOpenFaqIndex(null);
    if (tabs.length > 0) {
      setActiveTab(tabs[0].id);
    }
  }, [product.id]);

  const handleImageError = (e) => {
    e.target.src = FALLBACK_IMAGE;
    e.target.alt = `${product.name} - Image unavailable`;
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    if (!product.inStock) return;
    const effectiveSize = selectedSize || selectedPackSize || null;
    for (let i = 0; i < quantity; i++) {
      addToCart(product, effectiveSize, selectedWeight);
    }
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2200);
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const relatedProducts = getRelatedProducts(product.slug, 4);

  return (
    <article className="product-detail">
      {/* Top 2-Column Grid */}
      <div className="product-detail-hero">
        {/* Left: Gallery */}
        <div className="product-gallery">
          <div className="product-gallery-main">
            <img
              src={selectedImage}
              alt={product.name}
              className="product-main-image"
              onError={handleImageError}
              loading="eager"
            />
            {product.badge && (
              <span className="product-card-badge product-detail-badge">
                {product.badge}
              </span>
            )}
          </div>

          {galleryList.length > 1 && (
            <div className="product-thumbnails" role="group" aria-label="Product thumbnails">
              {galleryList.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`product-thumbnail-btn ${selectedImage === imgUrl ? 'active' : ''}`}
                  onClick={() => setSelectedImage(imgUrl)}
                  aria-label={`Show image ${idx + 1} of ${galleryList.length}`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="product-thumbnail-image"
                    onError={handleImageError}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="product-info-panel">
          <p className="product-category-crumb">
            <Link to="/shop" className="product-category-link">
              Shop
            </Link>
            <span className="crumb-separator">/</span>
            <span>{product.category}</span>
          </p>

          <h1 className="product-info-title">{product.name}</h1>

          <div className="product-info-price">
            <span className="current-price">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.compareAtPrice && (
              <span className="compare-price">
                {formatPrice(product.compareAtPrice, product.currency)}
              </span>
            )}
          </div>

          <div className="product-stock-status">
            <span
              className={`stock-indicator ${product.inStock ? 'in-stock' : 'out-of-stock'}`}
              aria-hidden="true"
            />
            <span className="stock-text">
              {product.inStock ? 'In Stock' : 'Currently Unavailable'}
            </span>
          </div>

          <p className="product-info-description">{product.description}</p>

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="product-variant-group">
              <label className="variant-label">
                Size: <span className="variant-selected-value">{selectedSize}</span>
              </label>
              <div className="variant-options" role="radiogroup" aria-label="Available sizes">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    role="radio"
                    aria-checked={selectedSize === size}
                    className={`variant-option-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Weight Selector */}
          {product.weights && product.weights.length > 0 && (
            <div className="product-variant-group">
              <label className="variant-label">
                Weight: <span className="variant-selected-value">{selectedWeight}</span>
              </label>
              <div className="variant-options" role="radiogroup" aria-label="Available weights">
                {product.weights.map((weight) => (
                  <button
                    key={weight}
                    type="button"
                    role="radio"
                    aria-checked={selectedWeight === weight}
                    className={`variant-option-btn ${selectedWeight === weight ? 'active' : ''}`}
                    onClick={() => setSelectedWeight(weight)}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pack Size Selector */}
          {product.packSizes && product.packSizes.length > 0 && (
            <div className="product-variant-group">
              <label className="variant-label">
                Pack Size: <span className="variant-selected-value">{selectedPackSize}</span>
              </label>
              <div className="variant-options" role="radiogroup" aria-label="Available pack sizes">
                {product.packSizes.map((pack) => (
                  <button
                    key={pack}
                    type="button"
                    role="radio"
                    aria-checked={selectedPackSize === pack}
                    className={`variant-option-btn ${selectedPackSize === pack ? 'active' : ''}`}
                    onClick={() => setSelectedPackSize(pack)}
                  >
                    {pack}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="product-purchase-row">
            <div className="product-quantity-wrapper">
              <label htmlFor="product-qty" className="quantity-label sr-only">
                Quantity
              </label>
              <div className="quantity-controls" role="group" aria-label="Product quantity controls">
                <button
                  type="button"
                  className="quantity-btn"
                  onClick={handleDecreaseQuantity}
                  disabled={quantity <= 1 || !product.inStock}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span id="product-qty" className="quantity-display" aria-live="polite">
                  {quantity}
                </span>
                <button
                  type="button"
                  className="quantity-btn"
                  onClick={handleIncreaseQuantity}
                  disabled={!product.inStock}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <button
              type="button"
              className={`product-add-to-cart-btn ${added ? 'added' : ''}`}
              onClick={handleAddToCart}
              disabled={!product.inStock}
              aria-live="polite"
            >
              {added ? (
                <>
                  <Check size={18} className="btn-icon" />
                  <span>Added to cart ✓</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} className="btn-icon" />
                  <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tabbed Content Section */}
      {tabs.length > 0 && (
        <section className="product-tabs-section" aria-label="Product Specifications">
          <div className="product-tabs-header" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`tabpanel-${tab.id}`}
                className={`product-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {tabs.map((tab) => (
            <div
              key={tab.id}
              id={`tabpanel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab.id}`}
              className={`product-tab-panel ${activeTab === tab.id ? 'active' : ''}`}
              hidden={activeTab !== tab.id}
            >
              <ul className="product-tab-content-list">
                {tab.content.map((item, idx) => (
                  <li key={idx} className="product-tab-content-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* FAQs Accordion */}
      {product.faqs && product.faqs.length > 0 && (
        <section className="product-faqs-section" aria-labelledby="faqs-heading">
          <h2 id="faqs-heading" className="product-section-title">
            Frequently Asked Questions
          </h2>
          <div className="product-accordion">
            {product.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className={`accordion-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="accordion-header"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <span className="accordion-question">{faq.question}</span>
                    <span className="accordion-icon">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      className="accordion-body"
                    >
                      <p className="accordion-answer">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="product-related-section" aria-labelledby="related-heading">
          <h2 id="related-heading" className="product-section-title">
            Related Products
          </h2>
          <div className="product-grid">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
