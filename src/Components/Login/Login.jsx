import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Logo from "../../../src/assets/olx-logo.png";
import { FirebaseContext } from "../../Context/Context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Input validation
    if (!email || !password) {
      toast.error("Email and password are required!");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      navigate("/"); 
    } catch (error) {
      const errorMessage = error.code 
        ? error.code.split('/')[1].split('-').join(" ") 
        : "Login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="loginParentDiv">
      <img width="200px" src={Logo} alt="OLX Logo" />
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          
        />
        <button type="submit">Login</button>
      </form>
      <div className="signupLink">
        <br />
        <button onClick={handleSignupClick}>
          Don't have an account? Signup
        </button>
      </div>
    </div>
  );
};

export default Login;
