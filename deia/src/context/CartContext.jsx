import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'deia-cart';

function loadCartFromStorage() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn('Failed to load cart from localStorage:', e);
  }
  return [];
}

function saveCartToStorage(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.warn('Failed to save cart to localStorage:', e);
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCartFromStorage);

  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const addToCart = useCallback((product, selectedSize = null, selectedWeight = null) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === product.id && 
                item.selectedSize === selectedSize && 
                item.selectedWeight === selectedWeight
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1
        };
        return updated;
      }

      return [...prev, {
        id: product.id,
        slug: product.slug,
        name: product.name,
        image: product.image,
        price: product.price,
        currency: product.currency || 'INR',
        selectedSize,
        selectedWeight,
        quantity: 1
      }];
    });
  }, []);

  const removeFromCart = useCallback((itemId, selectedSize = null, selectedWeight = null) => {
    setCart(prev => prev.filter(
      item => !(item.id === itemId && 
               item.selectedSize === selectedSize && 
               item.selectedWeight === selectedWeight)
    ));
  }, []);

  const updateQuantity = useCallback((itemId, newQuantity, selectedSize = null, selectedWeight = null) => {
    if (newQuantity < 1) {
      removeFromCart(itemId, selectedSize, selectedWeight);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.id === itemId && 
          item.selectedSize === selectedSize && 
          item.selectedWeight === selectedWeight) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    const itemsWithPrice = cart.filter(item => item.price !== null && item.price !== undefined);
    if (itemsWithPrice.length === 0) return null;
    return itemsWithPrice.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  const hasItemsWithoutPrice = useMemo(() => {
    return cart.some(item => item.price === null || item.price === undefined);
  }, [cart]);

  const isInCart = useCallback((productId) => {
    return cart.some(item => item.id === productId);
  }, [cart]);

  const value = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    subtotal,
    hasItemsWithoutPrice,
    isInCart
  }), [cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, subtotal, hasItemsWithoutPrice, isInCart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;
