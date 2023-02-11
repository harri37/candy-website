import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../helper/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import OrderList from "../components/OrderList";
import { db } from "../firebase";
import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import LeftHeading from "../components/LeftHeading";

const Admin = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [creatingProduct, setCreatingProduct] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const sizeOrder = {
    "ONE SIZE": 0,
    XS: 1,
    S: 2,
    M: 3,
    L: 4,
    XL: 5,
    XXL: 6,
  };

  useEffect(() => {
    //redirect to login if not logged in
    if (
      currentUser &&
      currentUser.email !== process.env.REACT_APP_ADMIN_EMAIL
    ) {
      navigate("/access-denied");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const getOrders = async () => {
      const querySnapshot = await getDocs(collection(db, "orders"));
      const orders = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setOrders(orders);
      setLoading(false);
    };

    const getProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const products = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setProducts(products);
    };

    if (creatingProduct) return;
    getProducts();
    getOrders();
    setLoading(false);
  }, [creatingProduct]);

  const Orders = () => {
    return <OrderList orders={orders} />;
  };

  const CreateProduct = () => {
    const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"];
    const initialSizes = sizes.map((size) => {
      return { size: size, checked: false };
    });
    const nameRef = useRef("");
    const priceRef = useRef();
    const [images, setImages] = useState([]);
    const descriptionRef = useRef();
    const [sizesState, setSizesState] = useState(initialSizes);
    const storage = getStorage();

    const handleSubmit = async (e) => {
      //create new product in database
      const name = nameRef.current.value;
      const price = parseInt(priceRef.current.value);
      const description = descriptionRef.current.value;
      setCreatingProduct(true);
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

        console.log("hasSize", hasSize);
        console.log("sizesState", sizesState);
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
          Object.assign(sizeObj, size);
        });

        console.log("sizeObj", sizeObj);

        console.log("firebase images", firebaseImages);

        //create new product in firestore
        const newProduct = {
          name: name,
          price: price,
          images: firebaseImages,
          description: description,
          sizes: sizeObj,
          dateCreated: new Date(),
        };
        const docRef = await addDoc(collection(db, "products"), newProduct);
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding document: ", error);
      }

      setCreatingProduct(false);
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
      <>
        <h2>Create Product</h2>
        <div className="min-form">
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
            <label htmlFor="image">
              Images (first image used as thumbnail)
            </label>
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
            <textarea
              name="description"
              id="description"
              ref={descriptionRef}
            />
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
            <button type="submit" disabled={creatingProduct}>
              Create
            </button>
          </form>
        </div>
      </>
    );
  };

  const ExistingProducts = () => {
    //convert sizes object to array

    const handleDelete = async (product) => {
      try {
        setCreatingProduct(true);
        await deleteDoc(doc(db, "products", product.name));
        console.log("Document successfully deleted!");
      } catch (error) {
        console.error("Error removing document: ", error);
      }
      setCreatingProduct(false);
    };

    const Product = ({ product }) => {
      const sizes = Object.keys(product.sizes)
        .map((size) => {
          return { size: size, quantity: product.sizes[size].quantity };
        })
        .sort((a, b) => sizeOrder[a.size] - sizeOrder[b.size]);

      console.log(product);
      return (
        <tr key={product.name}>
          <td>{product.name}</td>
          <td>${product.price}</td>
          <td>
            {sizes.map((size) => (
              <div key={size.size}>
                {size.size}: {size.quantity}
              </div>
            ))}
          </td>
          <td>{product.description}</td>
          <td>
            <Link to={`/admin/edit/${product.id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDelete(product)}>Delete</button>
          </td>
        </tr>
      );
    };

    return (
      <div className="existing-products">
        <h2>Existing Products</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Sizes</th>
              <th>Description</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <Product product={product} key={product.name} />
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const tabs = [<Orders />, <CreateProduct />, <ExistingProducts />];

  const Tabs = () => {
    return (
      <div className="admin-tabs">
        <p
          className={selectedTab === 0 ? "selected" : ""}
          onClick={() => setSelectedTab(0)}
        >
          Orders
        </p>
        <p
          className={selectedTab === 1 ? "selected" : ""}
          onClick={() => setSelectedTab(1)}
        >
          Create Product
        </p>
        <p
          className={selectedTab === 2 ? "selected" : ""}
          onClick={() => setSelectedTab(2)}
        >
          Existing Products
        </p>
      </div>
    );
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="content-area">
      <LeftHeading text="Admin" />
      <Tabs />
      {tabs[selectedTab]}
    </div>
  );
};

export default Admin;
