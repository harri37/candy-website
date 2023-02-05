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

  useEffect(() => {
    const getProduct = async () => {
      const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];

      const docRef = doc(db, "products", productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
        const sizes = Object.keys(docSnap.data().sizes);
        setSelectedSize(sizes[0]);
        setSizes(
          sizes.sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b))
        );
      } else {
        console.log("No such document!");
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
    const [currentImage, setCurrentImage] = useState(0);

    const handleImageChange = (e) => {
      console.log(e.target.value);
      setCurrentImage(e.target.value);
    };

    const ImageSlide = ({ image }) => {
      return (
        <div className="product-image-carousel-selected">
          <img src={image} alt={product.name} />
        </div>
      );
    };

    const imageSlides = product.images.map((image, index) => (
      <ImageSlide image={image} key={index} />
    ));

    return (
      <div className="product-images">
        {imageSlides[currentImage]}
        <div className="product-image-select">
          {product.images.map((image, index) => (
            <input
              key={index}
              type="radio"
              name="product-image"
              value={index}
              id={`product-image-${index}`}
              checked={parseInt(currentImage) === index}
              onChange={handleImageChange}
            />
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
  ) : (
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
  );
};

export default Product;
