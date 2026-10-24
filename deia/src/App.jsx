import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CartProvider } from './context/CartContext';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductPage from './pages/ProductPage';
import OurStory from './pages/OurStory';
import Ingredients from './pages/Ingredients';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Policies from './pages/Policies';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />

        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />

            <Route
              path="/privacy-policy"
              element={<Policies type="privacy" />}
            />

            <Route
              path="/terms-and-conditions"
              element={<Policies type="terms" />}
            />

            <Route
              path="/shipping-and-returns"
              element={<Policies type="shipping" />}
            />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;