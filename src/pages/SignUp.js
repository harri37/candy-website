import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../helper/AuthContext";
import Title from "../components/Title";
import { useNavigate, Link } from "react-router-dom";
import { db, functions } from "../firebase";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { auth } from "../firebase";

const SignUp = () => {
  const [fetching, setFetching] = useState(false);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("fetch loop");
    const fetchUsers = async () => {
      const userData = await getDocs(collection(db, "users"));
      setUsers(userData.docs.map((doc) => doc.data()));
      setFetching(false);
    };

    fetchUsers();
  }, []);

  const updateErrors = useCallback(
    (error) => {
      if (!errors.includes(error)) {
        setErrors((errors) => [...errors, error]);
      }
    },
    [errors]
  );

  const removeError = useCallback(
    (error) => {
      if (errors.includes(error)) {
        setErrors((errors) => errors.filter((e) => e !== error));
      }
    },
    [errors]
  );

  useEffect(() => {
    if (
      password !== confirmPassword &&
      password.length > 5 &&
      confirmPassword.length > 5
    ) {
      updateErrors("Passwords do not match");
    } else {
      removeError("Passwords do not match");
    }
  }, [password, confirmPassword, updateErrors, removeError]);

  useEffect(() => {
    if (password.length < 6 && password.length > 0) {
      updateErrors("Password must be at least 6 characters");
    } else {
      removeError("Password must be at least 6 characters");
    }
  }, [password, updateErrors, removeError]);

  useEffect(() => {
    const re = /^04\d{8}$/;
    if (!re.test(phone) && phone.length > 9) {
      return updateErrors("Phone number must be valid AU number");
    } else {
      removeError("Phone number must be valid AU number");
    }
  }, [phone, updateErrors, removeError]);

  useEffect(() => {
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email) && email.length > 5) {
      return updateErrors("Email must be valid");
    } else {
      removeError("Email must be valid");
    }
  }, [email, updateErrors, removeError]);

  useEffect(() => {
    if (users.some((user) => user.email === email)) {
      return updateErrors("Email already in use");
    } else {
      removeError("Email already in use");
    }
  }, [email, users, updateErrors, removeError]);

  useEffect(() => {
    if (users.some((user) => user.phone === phone)) {
      return updateErrors("Phone number already in use");
    } else {
      removeError("Phone number already in use");
    }
  }, [phone, users, updateErrors, removeError]);

  const handleSubmit = async (e) => {
    /**
     * Creates a new user account associated with the specified email address and password.
     * Creates new data in the "users" collection in Firestore.
     * On successful creation of the user account, this user will also be signed in to your application.
     */

    e.preventDefault();

    try {
      setLoading(true);

      //get stripe customer id
      // const createStripeCustomer = functions.httpsCallable("createCustomer");
      // const customer = await createStripeCustomer({ email: email });
      // console.log("customer", customer);

      await signup(email, password);
      //get user id
      const user = auth.currentUser.multiFactor.user.uid;
      console.log("user", user);

      //add user to firestore
      await setDoc(doc(db, "users", user), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        address: address,
      });

      //create stripe customer
      await setDoc(doc(db, "customers", user), {
        email: email,
      });

      //navigate("/");
    } catch (e) {
      console.log(e);
      //setError("Failed to create an account");
    }
    setLoading(false);
  };

  return fetching ? (
    <p>Loading</p>
  ) : (
    <div className="content-area">
      <Title title="Sign Up" />
      <div className="min-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="password-confirm">Confirm Password</label>
          <input
            type="password"
            id="password-confirm"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <button
            disabled={loading && errors.length === 0}
            className="form-button"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        {errors.length > 0 && (
          <div className="errors">
            {errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};

export default SignUp;
