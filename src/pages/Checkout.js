import React, { useEffect, useState } from "react";
import { useCart } from "../helper/CartContext";
import { useAuth } from "../helper/AuthContext";
import { useNavigate } from "react-router-dom";
import { GooglePayButton } from "@google-pay/button-react";
import { loadScript } from "@paypal/paypal-js";

const Checkout = () => {
  const { cart } = useCart();
  const { currentUser } = useAuth();
  const [payPal, setPayPal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //load paypal script
    const loadPaypal = async () => {
      try {
        const paypal = await loadScript({ "client-id": "test" });
        setPayPal(paypal);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    loadPaypal();
  }, []);

  const handleCheckout = () => {
    //send order to server
    //clear cart
    //redirect to home
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="checkout">
      <h1>Checkout</h1>
      <div className="checkout-items">
        {cart.map((product) => (
          <div className="checkout-item" key={product.name + product.size}>
            <p>
              {product.name} {product.size}
            </p>
            <p>{product.quantity}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
      <div className="checkout-total">
        <p>Total: ${cart.reduce((acc, product) => acc + product.price, 0)}</p>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default Checkout;
