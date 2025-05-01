import React, { useState, useEffect } from "react";
import styles from "../css/signup.module.css"; // Import the CSS file
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

// import LoginForm from "./LoginPage";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    collegeId: "",
    mobileNo: "",
  });

  const [colleges, setColleges] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");

  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    // Fetch colleges from the backend
    const fetchColleges = async () => {
      try {
        const response = await api.get("/api/v1/colleges");
        setColleges(response.data.data.colleges); // Set the fetched colleges
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };

    fetchColleges();
  }, []);

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      setStatusMessage("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await api.post("/api/v1/students/signup", formData);

      if (response.status === 201) {
        setStatusMessage("Signup successful!");
        console.log("Success:", response.data);
      }
    } catch (error) {
      if (error.response) {
        setStatusMessage(`Signup failed: ${error.response.data.message}`);
        console.error("Error:", error.response.data);
      } else {
        setStatusMessage("Signup failed: Unable to connect to the server.");
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center text-center bg-white min-h-screen font-(family-name:Arial, sans-serif)">
      <div className="container" style={{ width: "400px" }}>
        <form className="registration-form" onSubmit={handleSubmit}>
          <h1 style={{ color: "purple" }}>Sign Up</h1>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.passwordConfirm}
            onChange={(e) => handleChange("passwordConfirm", e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Contact please"
            value={formData.phoneNo}
            onChange={(e) => handleChange("mobileNo", e.target.value)}
          />

          <select
            value={formData.collegeId}
            onChange={(e) => handleChange("collegeId", e.target.value)}
            required
            className={styles.selectTab}
          >
            <option value="">Select College</option>
            {colleges.map((college) => (
              <option key={college._id} value={college._id}>
                {college.name}
              </option>
            ))}
          </select>

          <button type="submit">Register</button>
          <p className="status-message">{statusMessage}</p>
          <Link to="/login">
            <p style={{ marginTop: "15px", color: "purple" }}>
              Already have an account? Login
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
