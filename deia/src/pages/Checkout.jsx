import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';

export default function Checkout() {
  const cartContext = useContext(CartContext);

  const cartItems =
    cartContext?.cartItems ??
    cartContext?.cart ??
    cartContext?.items ??
    [];

  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
  });

  const [notice, setNotice] = useState('');

  const formatPrice = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);

  const total = cartItems.reduce((sum, item) => {
    const price = Number(item.price ?? item.salePrice ?? 0);
    const quantity = Number(item.quantity ?? 1);

    return sum + price * quantity;
  }, 0);

  function handleChange(event) {
    setCustomer({
      ...customer,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    setNotice(
      'Your details have been validated locally, but no order has been placed. Connect your checkout backend and payment provider to complete your purchase.'
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="page-container checkout-page">
        <h1>Your bag is empty</h1>
        <p>Add products before proceeding to checkout.</p>
        <Link to="/shop">Explore the Collection</Link>
      </section>
    );
  }

  return (
    <section className="page-container checkout-page">
      <header className="page-header">
        <p className="eyebrow">ALMOST YOURS</p>
        <h1>Checkout</h1>
        <p>Enter your details to prepare your order.</p>
      </header>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Contact Information</h2>

          <label htmlFor="checkout-name">Full Name</label>
          <input
            id="checkout-name"
            name="name"
            value={customer.name}
            onChange={handleChange}
            autoComplete="name"
            required
          />

          <label htmlFor="checkout-email">Email Address</label>
          <input
            id="checkout-email"
            name="email"
            type="email"
            value={customer.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <label htmlFor="checkout-phone">Phone Number</label>
          <input
            id="checkout-phone"
            name="phone"
            type="tel"
            value={customer.phone}
            onChange={handleChange}
            autoComplete="tel"
            required
          />

          <h2>Shipping Address</h2>

          <label htmlFor="checkout-address">Street Address</label>
          <textarea
            id="checkout-address"
            name="address"
            value={customer.address}
            onChange={handleChange}
            autoComplete="street-address"
            rows="3"
            required
          />

          <label htmlFor="checkout-city">City</label>
          <input
            id="checkout-city"
            name="city"
            value={customer.city}
            onChange={handleChange}
            autoComplete="address-level2"
            required
          />

          <label htmlFor="checkout-state">State</label>
          <input
            id="checkout-state"
            name="state"
            value={customer.state}
            onChange={handleChange}
            autoComplete="address-level1"
            required
          />

          <label htmlFor="checkout-postal">PIN Code</label>
          <input
            id="checkout-postal"
            name="postalCode"
            value={customer.postalCode}
            onChange={handleChange}
            autoComplete="postal-code"
            inputMode="numeric"
            pattern="[0-9]{6}"
            title="Enter a valid six-digit Indian PIN code"
            required
          />

          <button type="submit">Continue with Order</button>

          {notice && <p role="status">{notice}</p>}
        </form>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          {cartItems.map((item) => {
            const name = item.name ?? item.title ?? 'Product';
            const price = Number(item.price ?? item.salePrice ?? 0);
            const quantity = Number(item.quantity ?? 1);
            const id = item.id ?? item.slug ?? item._id ?? name;

            return (
              <div className="checkout-summary-item" key={id}>
                <span>{name} × {quantity}</span>
                <span>{formatPrice(price * quantity)}</span>
              </div>
            );
          })}

          <hr />

          <p>
            Total: <strong>{formatPrice(total)}</strong>
          </p>

          <p>Shipping charges, if applicable, will be confirmed before payment.</p>

          <Link to="/cart">Return to Cart</Link>
        </aside>
      </div>
    </section>
  );
}