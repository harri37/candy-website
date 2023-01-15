import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [shown, setShown] = useState(false);

  const addToCart = (product) => {
    // Check if product is already in cart
    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
      // If product is already in cart, increase quantity
      setCart((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      return;
    }
    setCart((prev) => [...prev, product]);
  };

  const reduceQuantity = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart.quantity === 1) {
      removeFromCart(product);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const removeFromCart = (product) => {
    setCart((prev) => prev.filter((item) => item.id !== product.id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    reduceQuantity,
    shown,
    setShown,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
