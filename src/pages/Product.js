import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { getDocs, where, collection, query } from "firebase/firestore";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      //get product from db where id = productId
      const q = query(
        collection(db, "products"),
        where("id", "==", parseInt(productId))
      );
      const querySnapshot = await getDocs(q);
      setProduct(querySnapshot.docs[0].data());

      setLoading(false);
    };
    getProduct();
  }, [productId]);

  const ProductImages = () => {
    /**
     * Generates carousel of product images
     * @returns {JSX.Element} Carousel of product images
     */
    const [currentImage, setCurrentImage] = useState(0);

    const handleImageChange = (e) => {
      console.log(e.target.value);
      setCurrentImage(e.target.value);
    };

    return (
      <div className="product-images">
        <div className="product-image-carousel-selected">
          <img src={product.images[currentImage]} alt={product.name} />
        </div>
        <div className="product-image-carousel">
          {product.images.map((image, index) => (
            <div className="product-image-carousel-item" key={index}>
              <input
                type="radio"
                name="product-image"
                value={index}
                id={`product-image-${index}`}
                checked={parseInt(currentImage) === index}
                onChange={handleImageChange}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <ProductImages />
    </div>
  );
};

export default Product;
