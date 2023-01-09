import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Shop = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

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

  return loading ? (
    <p>Loading...</p>
  ) : (
    <>
      <Title title="Shop" />
      <div className="shop">
        {products.map((product) => (
          <div className="product" key={product.name}>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Shop;
