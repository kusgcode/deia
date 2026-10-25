import { useParams, Link } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
import { getProductBySlug } from '../data/products';

export default function ProductPage() {
  // The route in App.jsx is "/product/:slug"
  const { slug } = useParams();
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <section className="page-container page-header">
        <h1>Product not found</h1>
        <p>We couldn't find the product you're looking for.</p>
        <Link to="/shop" className="btn btn-primary">Return to Shop</Link>
      </section>
    );
  }

  return (
    <main className="product-page container">
      <ProductDetail key={product.slug} product={product} />
    </main>
  );
}
