import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../helper/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { getDocs, collection, setDoc, doc } from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const Admin = () => {
  const adminEmail = "harrisonwills37@gmail.com";
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    //redirect to login if not logged in
    if (currentUser && currentUser.email !== adminEmail) {
      navigate("/access-denied");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const getOrders = async () => {
      const querySnapshot = await getDocs(collection(db, "orders"));
      const orders = querySnapshot.docs.map((doc) => doc.data());
      setOrders(orders);
      setLoading(false);
    };

    const getProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const products = querySnapshot.docs.map((doc) => doc.data());
      setProducts(products);
    };

    getProducts();
    getOrders();
    setLoading(false);
  }, []);

  const Order = ({ order }) => {
    return (
      <div className="admin-order">
        <h2>{order.name}</h2>
        <p>{order.email}</p>
        <p>{order.address}</p>
        <p>{order.city}</p>
        <p>{order.state}</p>
        <p>{order.zip}</p>
        <p>{order.country}</p>
        <p>{order.phone}</p>
        <p>{order.total}</p>
        <div className="admin-order-items">
          {order.items.map((item) => (
            <div className="admin-order-item" key={item.name + item.size}>
              <p>
                {item.name} {item.size}
              </p>
              <p>{item.quantity}</p>
              <p>${item.price}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CreateProduct = () => {
    const sizes = ["S", "M", "L", "XL", "XXL", "3XL", "4XL"];
    const initialSizes = sizes.map((size) => {
      return { size: size, checked: false };
    });
    const nameRef = useRef();
    const priceRef = useRef();
    const [images, setImages] = useState([]);
    const descriptionRef = useRef();
    const [sizesState, setSizesState] = useState(initialSizes);
    const storage = getStorage();

    const handleSubmit = async (e) => {
      //create new product in database
      e.preventDefault();
      const firebaseImages = [];
      console.log("uploading images");

      try {
        //upload images to firebase storage
        await Promise.all(
          images.map(async (image) => {
            const fbStorageRef = storageRef(storage, `images/${image.name}`);
            const uploadTask = await uploadBytes(fbStorageRef, image);
            const downloadURL = await getDownloadURL(uploadTask.ref);
            firebaseImages.push(downloadURL);
          })
        );

        const hasSize = sizesState.some((size) => size.checked === true);
        const sizeObj = {};
        const sizeObjArr = hasSize
          ? sizesState
              .map((size) => {
                return size.checked
                  ? {
                      [size.size]: {
                        quantity: 0,
                      },
                    }
                  : null;
              })
              .filter((size) => size !== null)
          : {
              "ONE SIZE": {
                quantity: 0,
              },
            };
        sizeObjArr.forEach((size) => {
          sizeObj[size] = sizeObjArr[size];
        });

        console.log("firebase images", firebaseImages);

        //create new product in firestore
        const newProduct = {
          name: nameRef.current.value,
          price: parseInt(priceRef.current.value),
          images: firebaseImages,
          description: descriptionRef.current.value,
          sizes: sizeObj,
        };
        await setDoc(doc(db, "products", newProduct.name), newProduct);
        console.log("Document successfully written!");
      } catch (error) {
        console.error("Error adding document: ", error);
      }

      //reset form
      nameRef.current.value = "";
      priceRef.current.value = "";
      setImages([]);
      descriptionRef.current.value = "";
      setSizesState(initialSizes);
    };

    const handleImageChange = (e) => {
      setImages(Array.from(e.target.files));
    };

    const handleSizeChange = (e, size) => {
      const newSize = { size: size, checked: e.target.checked };
      const newSizes = sizesState.map((size) =>
        size.size === newSize.size ? newSize : size
      );
      setSizesState(newSizes);
    };

    const handleRemoveImage = (image) => {
      setImages(images.filter((i) => i !== image));
    };

    return (
      <div className="admin-create-product">
        <h2>Create Product</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" ref={nameRef} required />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            ref={priceRef}
            required
          />
          <label htmlFor="image">Images (first image used as thumbnail)</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            id="image"
            required
            multiple
            onChange={handleImageChange}
          />
          {images.length > 0 && (
            <div className="uploaded-product-images">
              {images.map((image) => (
                <>
                  <img src={URL.createObjectURL(image)} alt={image.name} />
                  <button onClick={() => handleRemoveImage(image)}>
                    Remove
                  </button>
                </>
              ))}
            </div>
          )}
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" ref={descriptionRef} />
          <label htmlFor="sizes">Sizes (Leave blank for one size)</label>
          {sizes.map((size) => (
            <div className="size-select-checkbox" key={size}>
              <label htmlFor={size}>{size}</label>
              <input
                type="checkbox"
                checked={sizesState.find((s) => s.size === size).checked}
                name={size}
                id={size}
                onChange={(e) => handleSizeChange(e, size)}
              />
            </div>
          ))}
          <button type="submit">Create</button>
        </form>
      </div>
    );
  };

  const ExistingProduct = ({ product }) => {
    //convert sizes object to array
    const sizes = Object.keys(product.sizes).map((size) => {
      return { size: size, quantity: product.sizes[size].quantity };
    });

    return (
      <div className="existing-product">
        <h2>{product.name}</h2>
        <p>${product.price}</p>
        {sizes.map((size) => (
          <div className="size-quantity" key={size.size}>
            <strong>{size.size}</strong>
            <p>{size.quantity}</p>
          </div>
        ))}
      </div>
    );
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="admin">
      <h1>Admin</h1>
      <div className="admin-orders">
        {orders.length > 0 ? (
          orders.map((order) => <Order order={order} key={order.id} />)
        ) : (
          <p>No orders</p>
        )}
      </div>
      <CreateProduct />
      <div className="existing-products">
        <h2>Existing Products</h2>
        {products.map((product) => (
          <ExistingProduct product={product} key={product.name} />
        ))}
      </div>
    </div>
  );
};

export default Admin;
