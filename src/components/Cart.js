import React from "react";
import { useCart } from "../helper/CartContext";

const Cart = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    reduceQuantity,
    shown,
    setShown,
  } = useCart();

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
  };

  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
  };

  const handleReduceQuantity = (product) => {
    reduceQuantity(product);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleHideCart = () => {
    setShown(false);
  };

  return (
    shown && (
      <div className="cart">
        <div className="cart-header">
          <h1>Cart</h1>
          <button className="close" onClick={() => handleHideCart()}>
            Close
          </button>
        </div>
        {cart.map((product) => (
          <div className="cart-item" key={product.name + product.size}>
            <p>
              {product.name} {product.size}
            </p>
            <p>
              <button onClick={() => handleReduceQuantity(product)}>-</button>
              {product.quantity}
              <button onClick={() => handleAddToCart(product)}>+</button>
            </p>
            <p>${product.price}</p>
            <button onClick={() => handleRemoveFromCart(product)}>
              Remove
            </button>
          </div>
        ))}

        {cart.length === 0 ? (
          <p>Nothing Here...</p>
        ) : (
          <>
            <button className="clear" onClick={() => handleClearCart()}>
              Clear Cart
            </button>
            <p className="total">
              Total: $
              {cart.reduce(
                (acc, product) => acc + product.price * product.quantity,
                0
              )}
            </p>
          </>
        )}
      </div>
    )
  );
};

export default Cart;
