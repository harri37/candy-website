import React, { useEffect, useState } from "react";
import { useCart } from "../helper/CartContext";
import { useAuth } from "../helper/AuthContext";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import initializeStripe from "../stripe/initializeStripe";
import {
  doc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import Title from "../components/Title";
import { getFunctions, httpsCallable } from "firebase/functions";
import CheckoutForm from "../components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [ordering, setOrdering] = useState(false);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret: process.env.REACT_APP_STRIPE_CLIENT_SECRET,
    appearance,
  };

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

  const handleCheckout = async () => {
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
        priceId: product.priceId,
        productId: product.productId,
      })),
      total: cart.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      ),
      address: userData.address,
      date: new Date(),
    };

    console.log("order", order);
    try {
      // httpsCallable(functions, "createCheckoutSession");

      const docRef = doc(db, "customers", currentUser.uid);
      const colRef = collection(docRef, "checkout_sessions");
      const checkOutSessionRef = await addDoc(colRef, {
        line_items: cart.map((product) => ({
          price: product.priceId,
          quantity: product.quantity,
        })),
        mode: "payment",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

      onSnapshot(checkOutSessionRef, (snap) => {
        const { error, sessionId } = snap.data();
        if (error) {
          console.log(error);1
        }
        if (sessionId) {
          stripePromise.then((stripe) => {
            stripe.redirectToCheckout({ sessionId });
          });
        }
      });

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
              <strong>Total:&nbsp;</strong>$
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
