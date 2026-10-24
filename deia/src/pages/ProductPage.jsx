import React from "react";
import { useParams, Link } from "react-router-dom";

const products = {
  "sandalwood-logs": {
    name: "Sandalwood Logs",
    description: "Discover the natural character of traditional sandalwood.",
  },
  "sandalwood-oil": {
    name: "Sandalwood Oil",
    description: "Experience the distinctive aroma of sandalwood.",
  },
  "rose-water": {
    name: "Rose Water",
    description: "A refreshing addition to your daily routine.",
  },
  "sandalwood-powder": {
    name: "Sandalwood Powder",
    description: "A traditional essential for your rituals.",
  },
  agarbatti: {
    name: "Agarbatti",
    description: "Bring the familiar fragrance of traditional incense home.",
  },
};

export default function ProductPage() {
  const { productId } = useParams();
  const product = products[productId];

  if (!product) {
    return (
      <main>
        <h1>Product not found</h1>
        <Link to="/shop">Return to Shop</Link>
      </main>
    );
  }

  return (
    <main className="product-page">
      <p>DEIA COLLECTION</p>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <Link to="/shop">← Back to Collection</Link>
    </main>
  );
}