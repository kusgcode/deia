import { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductGrid from '../components/ProductGrid';
import { products, categories } from '../data/products';

export default function Shop() {
  const [category, setCategory] = useState('All');

  const visible =
    category === 'All' ? products : products.filter((p) => p.category === category);

  return (
    <>
      <section className="shop-header">
        <div className="shop-header-inner">
          <Breadcrumbs items={[{ label: 'Shop' }]} />
          <span className="eyebrow">The DEIA Collection</span>
          <h1 className="shop-title">Our Collection</h1>
          <p className="shop-description">
            Tradition, craftsmanship, and nature in every product.
          </p>
        </div>
      </section>

      <div className="shop-controls">
        <div className="shop-filter-group" role="group" aria-label="Filter by category">
          {['All', ...categories].map((c) => (
            <button
              key={c}
              type="button"
              className={`shop-filter-btn ${category === c ? 'active' : ''}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <ProductGrid products={visible} />
    </>
  );
}
