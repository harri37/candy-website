import React, { useRef, useState } from "react";
import { useAuth } from "../helper/AuthContext";
import Title from "../components/Title";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("emailRef", emailRef.current.value);
    console.log("passwordRef", passwordRef.current.value);
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  };

  return (
    <>
      <Title title="Login" />
      <div className="login">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailRef} required />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordRef} required />
          <button disabled={loading} type="submit">
            Login
          </button>
        </form>
        {error && <p>{error}</p>}
        <div className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </>
  );
};

export default LogIn;
