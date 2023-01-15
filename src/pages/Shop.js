import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useCart } from "../helper/CartContext";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import Cart from "../components/Cart";

const Shop = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const { addToCart, clearCart, shown, setShown } = useCart();

  const sizeOrder = {
    "ONE SIZE": 0,
    XS: 1,
    S: 2,
    M: 3,
    L: 4,
    XL: 5,
    XXL: 6,
    XXXL: 7,
    XXXXL: 8,
  };

  useEffect(() => {
    const getProducts = async () => {
      const q = query(collection(db, "products"), where("price", ">", 0));
      const querySnapshot = await getDocs(q);

      //set initial size array
      const initialSizes = {};
      querySnapshot.forEach((doc) => {
        initialSizes[doc.data().name] = Object.keys(doc.data().sizes)[0];
      });
      console.log(initialSizes);
      setSelectedSizes(initialSizes);

      setProducts(querySnapshot.docs.map((doc) => doc.data()));
      setLoading(false);
    };
    getProducts();
  }, []);

  const Product = ({ product }) => {
    const sizes = Object.keys(product.sizes).sort(
      (a, b) => sizeOrder[a] - sizeOrder[b]
    );
    const hasSizes = !product.sizes.hasOwnProperty("ONE SIZE");

    const handleSizeChange = (e) => {
      setSelectedSizes({ ...selectedSizes, [product.name]: e.target.value });
    };

    const SizeSelect = ({ shown }) => {
      return (
        shown && (
          <select
            onChange={handleSizeChange}
            value={selectedSizes[product.name]}
          >
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        )
      );
    };

    return (
      <Link to={`/products/${product.id}`}>
        <div className="product" key={product.name}>
          <h3>{product.name}</h3>
          <div className="product-image">
            <img src={product.images[0]} alt={product.name} />
          </div>
          <p>${product.price}</p>
          <SizeSelect shown={hasSizes} />
          <button
            onClick={() => {
              handleAddToCart({
                ...product,
                id: product.id + selectedSizes[product.name],
                size: selectedSizes[product.name],
              });
              setShown(true);
            }}
          >
            Add to Cart
          </button>
        </div>
      </Link>
    );
  };

  const handleAddToCart = (product, size) => {
    addToCart({ ...product, quantity: 1 });
  };

  const handleClearCart = () => {
    clearCart();
  };

  return loading ? (
    <p>Loading...</p>
  ) : (
    <>
      <Title title="Shop" />
      <button onClick={() => setShown(!shown)}>View Cart</button>
      <button onClick={handleClearCart}>Clear Cart</button>
      <Cart />
      <div className="shop-container">
        <div className="shop">
          {products.map((product) => (
            <Product product={product} key={product.name} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Shop;
