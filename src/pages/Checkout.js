import React, { useEffect, useState } from "react";
import { useCart } from "../helper/CartContext";
import { useAuth } from "../helper/AuthContext";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import Title from "../components/Title";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [ordering, setOrdering] = useState(false);

  // useEffect(() => {
  //   //load paypal script
  //   const loadPaypal = async () => {
  //     try {
  //       const paypal = await loadScript({ "client-id": "test" });
  //       setPayPal(paypal);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   loadPaypal();
  // }, []);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("email", "==", currentUser.email)
        );
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.docs[0].data());
        setUserData(querySnapshot.docs[0].data());
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [currentUser.email]);

  const handleCheckout = () => {
    setOrdering(true);

    const order = {
      userId: currentUser.uid,
      userName: userData.firstName + " " + userData.lastName,
      userEmail: currentUser.email,
      products: cart.map((product) => ({
        name: product.name,
        size: product.size,
        quantity: product.quantity,
        price: product.price,
      })),
      total: cart.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      ),
      address: userData.address,
      date: new Date(),
    };

    console.log(order);
    try {
      addDoc(collection(db, "orders"), order);
      clearCart();
      setMessage("Order placed successfully");
    } catch (error) {
      console.log(error);
      setMessage("Error placing order");
    }
    setOrdering(false);
  };

  const emptyCart = cart.length === 0;

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="content-area">
      <Title title="Checkout" />

      {emptyCart > 0 ? (
        <strong>No Items in cart</strong>
      ) : (
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
      )}

      <div className="checkout-total">
        {emptyCart ? (
          <div>
            <Link to="/shop">Add items to cart</Link>
          </div>
        ) : (
          <>
            <div id="price">
              <strong>Total:</strong> $
              {cart.reduce(
                (acc, product) => acc + product.price * product.quantity,
                0
              )}
            </div>
            <button onClick={handleCheckout} disabled={ordering}>
              Order
            </button>
          </>
        )}
      </div>
      {ordering && <div>Ordering...</div>}
      <div className="checkout-message">{message}</div>
    </div>
  );
};

export default Checkout;
