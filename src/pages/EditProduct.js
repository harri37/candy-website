import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../helper/AuthContext";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const EditProduct = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [updating, setUpdating] = useState(false);
  const [sizeQuantities, setSizeQuantities] = useState(null);
  const [images, setImages] = useState(null);
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();

  const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    if (
      currentUser &&
      currentUser.email !== process.env.REACT_APP_ADMIN_EMAIL
    ) {
      navigate("/access-denied");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const getProduct = async () => {
      const docRef = doc(db, "products", productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
        setSizeQuantities({ ...docSnap.data().sizes });
        setImages(docSnap.data().images);
      } else {
        navigate("/admin");
      }
      setLoading(false);
    };
    getProduct();
  }, [productId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const updatedProduct = {
      ...product,
      sizes: sizeQuantities,
      name: nameRef.current.value,
      price: parseInt(priceRef.current.value),
      description: descriptionRef.current.value,
    };
    try {
      await updateDoc(doc(db, "products", productId), updatedProduct);
      setMessage("Product updated successfully");
    } catch (error) {
      console.log(error);
      setMessage("Error updating product");
    }
    setUpdating(false);
  };

  const handleSizeChange = (e) => {
    setSizeQuantities({
      ...sizeQuantities,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  const handleImageDelete = (image) => {
    setImages(images.filter((im) => im !== image));
  };

  console.log("product, ", product);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="content-area">
          <h2>Edit Product</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={product.name}
              ref={nameRef}
            />
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              defaultValue={product.price}
              ref={priceRef}
            />
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              defaultValue={product.description}
              ref={descriptionRef}
            />
            <label htmlFor="quantities">Quantities</label>
            {Object.keys(product.sizes)
              .sort((a, b) => sizeOrder.indexOf[a] - sizeOrder.indexOf[b])
              .map((key, index) => (
                <div key={index}>
                  <label className="label-smaller" htmlFor={key}>
                    {key}
                  </label>
                  <input
                    onChange={handleSizeChange}
                    type="number"
                    name={key}
                    id={key}
                    defaultValue={product.sizes[key].quantity}
                  />
                </div>
              ))}
            <label htmlFor="image">Images</label>
            {images.map((image, index) => (
              <div key={index}>
                <div className="product-image-carousel-selected">
                  <img src={image} alt={product.name} />
                </div>
                <button onClick={() => handleImageDelete(image)}>Delete</button>
              </div>
            ))}
            <button>Add Image</button>
            <button disabled={updating} type="submit">
              Save
            </button>
          </form>
          {updating && <div>Updating...</div>}
          {message && <div>{message}</div>}
        </div>
      )}
    </>
  );
};

export default EditProduct;
