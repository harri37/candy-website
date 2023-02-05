import React from "react";
import { useAuth } from "../helper/AuthContext";
import { useNavigate } from "react-router";

const LogOut = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  handleLogOut();

  return <div>LogOut</div>;
};

export default LogOut;
