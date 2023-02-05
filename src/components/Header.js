import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../helper/AuthContext";
import { banner } from "../images/images";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  const getClass = (path) => {
    if (location.pathname === path) {
      return "active";
    } else {
      return "inactive";
    }
  };

  return (
    <header>
      <div className="header-banner">
        <Link to="/">
          <img src={banner} alt="candy banner" />
        </Link>
      </div>
      <div className="header-links">
        <Link to="/" className={getClass("/")}>
          Home
        </Link>
        <Link to="/shop" className={getClass("/shop")}>
          Shop
        </Link>
        <div className={"dropdown" + " " + getClass("/media")}>
          <button className="dropbtn">
            Media
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <Link to="/videos">Videos</Link>
            <Link to="/sweetTalk">Sweet Talk</Link>
            <Link to="/events">Events</Link>
          </div>
        </div>

        <div className={"dropdown" + " " + getClass("/login")}>
          <button className="dropbtn">
            {currentUser ? "Account" : "Log In"}
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            {currentUser ? (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/logout">Log Out</Link>
              </>
            ) : (
              <>
                <Link to="/login">Log In</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
