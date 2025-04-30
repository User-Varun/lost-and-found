import "../index.css";

import React from "react";
import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "http://localhost:9000/api/v1/students/login",
        formData
      );
      if (response.status === 200) {
        setStatusMessage("Login successful!");
        console.log("Success:", response.data);
        Cookies.set("jwt", response.data.token, { expires: 5 });
        Cookies.set("name", response.data.data.user.name, { expires: 5 });
        Cookies.set("email", response.data.data.user.email, { expires: 5 });
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      setStatusMessage("Login failed. Please try again.");
    }
  };

  return (
    <div
      // className="login-page"

      className="flex  flex-col items-center text-center bg-white min-h-screen justify-center"
    >
      <h1 style={{ color: "purple" }}>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="status-message">{statusMessage}</p>
      <Link to="/signup">
        <p style={{ color: "purple" }}>New To our App ? SignUp!</p>
      </Link>
    </div>
  );
};

export default LoginForm;
