import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import { useAuth } from "../helper/AuthContext";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import OrderList from "../components/OrderList";

const Dashboard = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [orders, setOrders] = useState(null);
  const navigate = useNavigate();

  const user = currentUser.multiFactor.user;

  useEffect(() => {
    //grab user data from firebase

    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("email", "==", user.email)
        );
        const orderQuery = query(
          collection(db, "orders"),
          where("userId", "==", user.uid)
        );
        const orderSnapshot = await getDocs(orderQuery);
        const querySnapshot = await getDocs(q);
        setOrders(
          orderSnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
        setUserData(querySnapshot.docs.map((doc) => doc.data()));
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [user]);

  const handleLogout = () => {
    setError("");

    try {
      logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  };

  return loading ? (
    <p>loading</p>
  ) : (
    <div className="content-area">
      <Title title="Dashboard" />
      <div className="dashboard">
        {error && <p>{error}</p>}
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <p>
          <strong>First Name:</strong> {userData[0].firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {userData[0].lastName}
        </p>
        <p>
          <strong>Phone:</strong> {userData[0].phone}
        </p>
        <p>
          <strong>Address:</strong> {userData[0].address}
        </p>
      </div>
      {orders.length > 0 ? <OrderList orders={orders} /> : <p>No orders</p>}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
