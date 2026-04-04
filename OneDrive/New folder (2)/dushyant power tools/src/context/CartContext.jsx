import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const saveCart = (items) => {
    setCartItems(items);
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const addToCart = (product, quantity = 1) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      const updatedItems = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
      saveCart(updatedItems);
    } else {
      saveCart([...cartItems, { ...product, quantity }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedItems = cartItems.filter(item => item.id !== productId);
    saveCart(updatedItems);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    const updatedItems = cartItems.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    saveCart(updatedItems);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartTotal = cartItems.reduce((total, item) => {
    const rawPrice = item.sale_price || item.regular_price || item.price_inr || 0;
    // Handle string prices like "₹89.39"
    const price = typeof rawPrice === 'string' 
      ? parseFloat(rawPrice.replace(/[^\d.]/g, '')) || 0 
      : rawPrice;
    return total + (price * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      cartTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
