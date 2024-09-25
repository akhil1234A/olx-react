import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "./Signup.css";
import Logo from "../../../src/assets/olx-logo.png";
import { FirebaseContext } from "../../Context/Context";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { auth, db } = useContext(FirebaseContext);
  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    if (!username) {
      toast.error("Username is required.");
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!phone || phone.length < 10) {
      toast.error("Please enter a valid phone number (at least 10 digits).");
      return false;
    }
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before submission
    if (!validateForm()) {
      return; // Stop the submission if validation fails
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      console.log("User created:", user);

      // Add user to Firestore
      const userCollectionRef = collection(db, "users"); // Ensure the collection name is correct
      await addDoc(userCollectionRef, {
        uid: user.uid,
        username,
        email,
        phone,
        authProvider: "local",
        createdAt: new Date(),
      });

      toast.success("Signup successful! Redirecting to login...");
      console.log("Profile updated and user data saved successfully!");
      navigate("/login");
    } catch (error) {
      const errorMessage = error.code 
        ? error.code.split('/')[1].split('-').join(" ") 
        : "An error occurred during signup.";
      toast.error(errorMessage);
      console.log('Error:', error);
    }
  };

  return (
    <div className="signupParentDiv">
      <img src={Logo} alt="" width='200px' />
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname">Username</label>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="input"
          type="text"
          id="fname"
          name="name"
          placeholder="Enter your username"
        />
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="input"
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
        />
        <label htmlFor="phone">Phone</label>
        <input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="input"
          type="number"
          id="phone"
          name="phone"
          placeholder="Enter your phone number"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="input"
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
        />
        <button type="submit">Signup</button>
        <a href="/login">Login</a>
      </form>
    </div>
  );
};

export default SignUp;
