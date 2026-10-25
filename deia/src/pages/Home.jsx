import { Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import Newsletter from '../components/Newsletter';
import { products } from '../data/products';

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-tagline">The Art of Tradition</span>
            <h1 className="hero-heading">
              Rooted in Nature.<br />Inspired by Tradition.
            </h1>
            <p className="hero-description">
              Discover the timeless beauty of sandalwood, rose water, and
              traditional Indian fragrances.
            </p>
            <Link to="/shop" className="hero-cta">Explore Our Collection</Link>
          </div>
          <div className="hero-image">
            <img
              src="/images/Deia Natural Heritage Product Showcase.png"
              alt="DEIA natural heritage products"
            />
          </div>
        </div>
      </section>

      <section className="collection-section">
        <h2 className="collection-heading">The DEIA Collection</h2>
        <p className="collection-subheading">
          Tradition, craftsmanship, and nature in every product.
        </p>
        <ProductGrid products={products} />
      </section>

      <Newsletter />
    </>
  );
}
