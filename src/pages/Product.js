import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { useCart } from "../helper/CartContext";

const Product = () => {
  const { addToCart, setShown, shown } = useCart();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizes, setSizes] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [productExists, setProductExists] = useState(true);
  const [stripeProduct, setStripeProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];

      const docRef = doc(db, "products", productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
        const sizes = Object.keys(docSnap.data().selections.sizes);
        setSelectedSize(sizes[0]);
        setSizes(
          sizes.sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b))
        );

        const stripeDocRef = doc(
          db,
          "stripe-products",
          docSnap.data().stripeId
        );
        const stripeDocSnap = await getDoc(stripeDocRef);
        if (stripeDocSnap.exists()) {
          setStripeProduct(stripeDocSnap.data());
        }
      } else {
        setProductExists(false);
      }
      setLoading(false);
    };

    getProduct();
  }, [productId]);

  const ProductImages = () => {
    /**
     * Generates carousel of product images
     * @returns {JSX.Element} Carousel of product images
     */

    const handleImageChange = (e) => {
      console.log(e.target.value);
      setCurrentImage(parseInt(e.target.value));
    };

    const ImageCarousel = () => {
      return (
        <div className="carousel">
          {product.images.map((image, index) => (
            <div
              className={
                index === currentImage
                  ? "carousel-item carousel-active"
                  : "carousel-item"
              }
              key={index.toString()}
            >
              <img
                className="carousel-item-image"
                src={image}
                alt={product.name}
              />
            </div>
          ))}
        </div>
      );
    };

    return (
      <div className="product-images">
        <ImageCarousel />
        <div className="product-image-select">
          {product.images.map((image, index) => (
            <div key={index.toString()}>
              <input
                key={index}
                type="radio"
                name="product-image"
                value={index}
                id={`product-image-${index}`}
                checked={parseInt(currentImage) === index}
                onChange={handleImageChange}
              />
              <label htmlFor={`product-image-${index}`}> </label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      id: product.id + selectedSize,
      size: selectedSize,
    });
    setShown(true);
  };

  return loading ? (
    <div>Loading...</div>
  ) : productExists ? (
    <div className="content-area">
      <h1>{product.name}</h1>
      <ProductImages />
      <p>{product.description}</p>

      {sizes.length > 1 && (
        <div className="product-image-select">
          {sizes.map((size, index) => (
            <div key={index}>
              <input
                type="radio"
                name="size"
                id={size}
                value={size}
                checked={selectedSize === size}
                onChange={(e) => setSelectedSize(e.target.value)}
              />
              <label htmlFor={size}>{size}</label>
            </div>
          ))}
        </div>
      )}
      <p>${product.price}</p>
      <button onClick={() => handleAddToCart()}>Add to Cart</button>
      <button onClick={() => setShown(!shown)}>Show Cart</button>
    </div>
  ) : (
    <div>Product not found</div>
  );
};

export default Product;
