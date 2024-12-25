


import React, { useState } from "react";
import "./../styles/Registration.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        alert("Registration successful!");
        navigate("/"); // Redirect to login page
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Registration failed!");
      } else {
        console.error("Error:", error);
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <span className="login-link" onClick={() => navigate("/")}>
          Login here
        </span>
      </p>
    </div>
  );
};

export default Registration;
