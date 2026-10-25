const INGREDIENTS = [
  {
    name: 'Sandalwood',
    image: 'src/assets/Sandalwood Ritual at the Temple Ghat.png',
    text: 'Celebrated for its distinctive woody aroma, sandalwood has a long history in Indian traditions, fragrance, and rituals.',
  },
  {
    name: 'Rose',
    image: 'src/assets/Rose Water Ritual at Sunrise.png',
    text: 'Rose water is valued for its delicate fragrance and its place in traditional beauty and personal-care routines.',
  },
  {
    name: 'Natural Fragrances',
    image: 'src/assets/Golden Hour Temple Incense Still Life.png',
    text: 'Fragrance is an important part of traditional Indian rituals, creating an atmosphere of calm and familiarity.',
  },
];

export default function Ingredients() {
  return (
    <>
      <section className="ingredients-hero">
        <div className="ingredients-hero-inner">
          <span className="eyebrow">The Essence of DEIA</span>
          <h1>Inspired by Nature</h1>
          <p>
            Discover the traditional ingredients and natural fragrances
            behind our collection.
          </p>
        </div>
      </section>

      {INGREDIENTS.map((item, i) => (
        <section className="ingredient-section" key={item.name}>
          <div className={`ingredient-inner ${i % 2 ? 'reverse' : ''}`}>
            <div className="ingredient-image">
              <img src={item.image} alt={item.name} loading="lazy" />
            </div>
            <div className="ingredient-details">
              <h2>{item.name}</h2>
              <p>{item.text}</p>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
