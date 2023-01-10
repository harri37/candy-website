import React, { useRef, useState } from "react";
import { useAuth } from "../helper/AuthContext";
import Title from "../components/Title";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase";

const SignUp = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    /**
     * Creates a new user account associated with the specified email address and password.
     * Creates new data in the "users" collection in Firestore.
     * On successful creation of the user account, this user will also be signed in to your application.
     */
    e.preventDefault();
    console.log("emailRef", emailRef.current.value);
    console.log("passwordRef", passwordRef.current.value);
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      //get user id
      const user = auth.currentUser.multiFactor.user.uid;
      console.log("user", user);

      //add user to firestore
      await setDoc(doc(db, "users", user), {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        address: addressRef.current.value,
      });
      navigate("/");
    } catch (e) {
      console.log(e);
      setError("Failed to create an account");
    }
    setLoading(false);
  };

  return (
    <>
      <Title title="Sign Up" />
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailRef} required />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordRef} required />
          <label htmlFor="password-confirm">Confirm Password</label>
          <input
            type="password"
            id="password-confirm"
            ref={confirmPasswordRef}
            required
          />
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" ref={firstNameRef} required />
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" ref={lastNameRef} required />
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" ref={phoneRef} required />
          <label htmlFor="address">Address</label>
          <input type="text" id="address" ref={addressRef} required />
          <button disabled={loading} type="submit">
            Sign Up
          </button>
        </form>
        <div className="login">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default SignUp;
