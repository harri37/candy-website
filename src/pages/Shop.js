import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useCart } from "../helper/CartContext";
import { db } from "../firebase";

const Shop = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [cartShown, setCartShown] = useState(false);
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    const getProducts = async () => {
      const q = query(collection(db, "products"), where("price", ">", 0));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
      setProducts(querySnapshot.docs.map((doc) => doc.data()));
      setLoading(false);
    };
    getProducts();
  }, []);

  const Cart = () => {
    return (
      <div className="cart">
        <div className="cart-header">
          <h1>Cart</h1>
          <button className="close" onClick={() => setCartShown(false)}>
            Close
          </button>
        </div>
        {cart.map((product, index) => (
          <div className="cart-item" key={product + toString(index)}>
            <p key={product.name}>{product.name + " " + product.quantity}</p>
            <p key={product.price}>${product.price}</p>
            <button onClick={() => handleRemoveFromCart(product)}>
              Remove
            </button>
          </div>
        ))}
        <p className="total">
          Total: $
          {cart.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0
          )}
        </p>
      </div>
    );
  };

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
  };

  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return loading ? (
    <p>Loading...</p>
  ) : (
    <>
      <Title title="Shop" />
      <button onClick={() => setCartShown(!cartShown)}>View Cart</button>
      <button onClick={handleClearCart}>Clear Cart</button>
      {cartShown && <Cart />}
      <div className="shop-container">
        <div className="shop">
          {products.map((product) => (
            <div
              className="product"
              key={product.name}
              onClick={() => handleAddToCart(product)}
            >
              <h3>{product.name}</h3>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Shop;
