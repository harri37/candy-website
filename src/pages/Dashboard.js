import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import { useAuth } from "../helper/AuthContext";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Dashboard = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
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
        const querySnapshot = await getDocs(q);
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
    <>
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
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Dashboard;
