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
      <div className="password-reset">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailRef} required />
          <button disabled={loading} type="submit">
            Forgot Password
          </button>
        </form>
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
        <Link to="/login">Log In</Link>
      </div>
    </>
  );
};

export default ForgotPassword;
