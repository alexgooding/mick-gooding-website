import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
  
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);
    }
    else {
      setCart({});
      localStorage.setItem("cart", JSON.stringify({}));
    }
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const addToCart = (productId, quantity) => {
    const updatedCart = {
      ...cart,
      [productId]: (cart[productId] || 0) + quantity,
    };

    updateCart(updatedCart);
  };

  const removeFromCart = (productId, quantity) => {
    const updatedCart = { ...cart };
    const oldQuantity = updatedCart[productId];
    if (oldQuantity !== undefined) {
      const newQuantity = oldQuantity - quantity;
      if (newQuantity <= 0) {
        delete updatedCart[productId];
      } else {
        updatedCart[productId] = newQuantity;
      }
    }

    updateCart(updatedCart);
  };

  const clearCart = () => {
    updateCart({});
  };

  const getQuantityOfProduct = (productId) => {
    return cart[productId] || 0;
  };

  const getQuantityOfAllProducts = () => {
    return Object.values(cart).reduce((total, count) => total + count, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getQuantityOfProduct,
        getQuantityOfAllProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
