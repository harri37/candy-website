import React, { useRef, useState } from "react";
import { useAuth } from "../helper/AuthContext";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("emailRef", emailRef.current.value);
    console.log("passwordRef", passwordRef.current.value);
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  };

  return (
    <>
      <Title title="Sign Up" />
      {currentUser && currentUser.email}
      <div className="signup">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailRef} required />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordRef} required />
          <button disabled={loading} type="submit">
            Sign Up
          </button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default SignUp;
