import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="headerTitle">title here</div>
      <div className="headerLinks">
        <Link to="/">Home</Link>
        <Link to="/videos">Videos</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/sweetTalk">Sweet Talk</Link>
        <Link to="/events">Events</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </header>
  );
};

export default Header;
