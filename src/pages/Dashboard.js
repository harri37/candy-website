import React, { useState } from "react";
import Title from "../components/Title";
import { useAuth } from "../helper/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setError("");

    try {
      logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  };

  return (
    <>
      <Title title="Dashboard" />
      <div className="dashboard">
        {error && <p>{error}</p>}
        <strong>Email:</strong> {currentUser.email}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default Dashboard;
