import React, { useRef, useState } from "react";
import { useAuth } from "../helper/AuthContext";
import Title from "../components/Title";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("emailRef", emailRef.current.value);
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  };

  return (
    <>
      <Title title="Password Reset" />
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailRef} required />
          <button disabled={loading} className="form-button" type="submit">
            Send Reset Email
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <Link to="/login">Log In</Link>
      </div>
    </>
  );
};

export default ForgotPassword;
