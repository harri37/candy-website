import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../helper/AuthContext";

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <header>
      <div className="headerTitle">title here</div>
      <div className="headerLinks">
        <Link to="/">Home</Link>
        <Link to="/videos">Videos</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/sweetTalk">Sweet Talk</Link>
        <Link to="/events">Events</Link>
        {currentUser ? (
          <Link to="/dashboard">Dashboard</Link>
        ) : (
          <Link to="/login">Log In</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
