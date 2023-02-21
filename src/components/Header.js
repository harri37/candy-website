import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../helper/AuthContext";
import { banner } from "../images/images";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { currentUser } = useAuth();
  const location = useLocation().pathname;
  console.log("location", location);

  const getClass = (path) => {
    //match the current path to the regualr expression
    const reg = new RegExp(path.join("|"));
    return reg.test(location) ? "active" : "";
  };

  return (
    <header>
      <div className="top-border" />
      <div className="header-banner">
        <Link to="/">
          <img src={banner} alt="candy banner" />
        </Link>
      </div>
      <div className="header-links">
        <div className={`header-link ${getClass(["^/$"])}`}>
          <Link to="/">Home</Link>
        </div>
        <div className={`header-link ${getClass(["^/shop(/.*)?$"])}`}>
          <Link to="/shop">Shop</Link>
        </div>
        <div
          className={`header-link ${getClass([
            "^/videos(/.*)?$",
            "^/events(/.*)?$",
            "^/sweetTalk(/.*)?$",
          ])}`}
        >
          <div className="dropdown">
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
        </div>

        <div
          className={`header-link ${getClass([
            "/login",
            "/signup",
            "/dashboard",
            "/admin",
          ])}`}
        >
          <div className="dropdown">
            <button className="dropbtn">
              Account
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
      </div>
    </header>
  );
};

export default Header;
