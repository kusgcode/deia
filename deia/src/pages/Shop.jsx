import React from "react";

const products = [
  {
    name: "Sandalwood Logs",
    description: "The timeless essence of natural sandalwood.",
    path: "/product/sandalwood-logs",
  },
  {
    name: "Sandalwood Oil",
    description: "An aromatic treasure inspired by tradition.",
    path: "/product/sandalwood-oil",
  },
  {
    name: "Rose Water",
    description: "A refreshing essential for your daily rituals.",
    path: "/product/rose-water",
  },
  {
    name: "Sandalwood Powder",
    description: "Finely prepared for traditional use.",
    path: "/product/sandalwood-powder",
  },
  {
    name: "Agarbatti",
    description: "Traditional incense for peaceful moments.",
    path: "/product/agarbatti",
  },
];

export default function Shop() {
  return (
    <main>
      <section className="shop-header">
        <p>THE DEIA COLLECTION</p>
        <h1>Our Collection</h1>
        <p>Tradition, craftsmanship, and nature in every product.</p>
      </section>

      <section className="shop-products">
        {products.map((product) => (
          <article key={product.name} className="product-card">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <a href={product.path}>Discover More →</a>
          </article>
        ))}
      </section>
    </main>
  );
}