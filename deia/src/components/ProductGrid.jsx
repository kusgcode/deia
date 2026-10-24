import ProductCard from './ProductCard';

export default function ProductGrid({ products, columns = 'auto' }) {
  if (!products || products.length === 0) {
    return (
      <div className="product-grid-empty">
        <p>No products found.</p>
      </div>
    );
  }

  const gridClass = columns === 'auto'
    ? 'product-grid'
    : `product-grid product-grid-${columns}`;

  return (
    <div className={gridClass}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
