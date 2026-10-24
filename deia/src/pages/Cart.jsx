import { Link } from 'react-router-dom';
import { useContext } from 'react';
import CartContext from '../context/CartContext';

export default function Cart() {
  const cartContext = useContext(CartContext);

  const cartItems =
    cartContext?.cartItems ??
    cartContext?.cart ??
    cartContext?.items ??
    [];

  const removeFromCart =
    cartContext?.removeFromCart ??
    cartContext?.removeItem;

  const updateQuantity =
    cartContext?.updateQuantity ??
    cartContext?.updateCartQuantity;

  const clearCart = cartContext?.clearCart;

  const getPrice = (item) =>
    Number(item.price ?? item.salePrice ?? 0);

  const getQuantity = (item) =>
    Number(item.quantity ?? 1);

  const getName = (item) =>
    item.name ?? item.title ?? 'Product';

  const getId = (item) =>
    item.id ?? item.slug ?? item._id ?? item.name;

  const total = cartItems.reduce(
    (sum, item) => sum + getPrice(item) * getQuantity(item),
    0
  );

  const formatPrice = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);

  return (
    <section className="page-container cart-page">
      <header className="page-header">
        <p className="eyebrow">YOUR DEIA COLLECTION</p>
        <h1>Your Shopping Bag</h1>
        <p>Review your selected essentials before checkout.</p>
      </header>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your bag is waiting for something special.</h2>
          <p>Explore our collection of traditional essentials.</p>
          <Link to="/shop">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <article className="cart-item" key={getId(item)}>
                {item.image && (
                  <img
                    src={item.image}
                    alt={getName(item)}
                    className="cart-item-image"
                  />
                )}

                <div className="cart-item-details">
                  <h2>{getName(item)}</h2>
                  <p>{formatPrice(getPrice(item))}</p>

                  <label>
                    Quantity
                    <input
                      type="number"
                      min="1"
                      value={getQuantity(item)}
                      onChange={(event) => {
                        const quantity = Number(event.target.value);

                        if (quantity >= 1 && updateQuantity) {
                          updateQuantity(getId(item), quantity);
                        }
                      }}
                    />
                  </label>

                  {removeFromCart && (
                    <button
                      type="button"
                      onClick={() => removeFromCart(getId(item))}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <p className="cart-item-subtotal">
                  {formatPrice(getPrice(item) * getQuantity(item))}
                </p>
              </article>
            ))}
          </div>

          <div className="cart-summary">
            <p>
              Subtotal: <strong>{formatPrice(total)}</strong>
            </p>
            <p>Shipping and applicable taxes are calculated at checkout.</p>

            <Link to="/checkout">Proceed to Checkout</Link>

            <Link to="/shop">Continue Shopping</Link>

            {clearCart && (
              <button type="button" onClick={clearCart}>
                Clear Cart
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
}