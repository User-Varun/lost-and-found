import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "../css/dashboard.module.css";
import UserItems from "../components/userItems"; // Import the UserItems component

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear JWT from cookies
    Cookies.remove("jwt");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "8px 12px",
        backgroundColor: "rgb(168 170 173)",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "2px",
      }}
    >
      Logout
    </button>
  );
}

const Dashboard = () => {
  const [filter, setFilter] = useState("all"); // State to track the selected filter
  const studentName = Cookies.get("name");
  const studentEmail = Cookies.get("email");

  if (!studentName || !studentEmail) {
    throw new Error("Cannot get the info from db");
  }

  return (
    <div className={styles.dashboard}>
      {/* Fixed Header */}
      <header className={styles.dashboardHeader}>
        <div className={styles.logo}>
          <h1 style={{ fontFamily: "oblique" }}>LostNFound</h1>
        </div>
        <div className={styles.headerActions}>
          <p className="bg-white-500">{studentName}</p>
          <p style={{ color: "white" }}>{studentEmail}</p>

          <LogoutButton />
        </div>
      </header>

      {/* Filter Section */}
      <div
        style={{
          padding: "10px",
          textAlign: "center",
          backgroundColor: "#f8f9fa",
          marginTop: "5rem",
        }}
      >
        <button
          onClick={() => setFilter("all")}
          style={{
            padding: "8px 12px",
            margin: "5px",
            backgroundColor: filter === "all" ? "purple" : "#ddd",
            color: filter === "all" ? "white" : "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          All
        </button>
        <button
          onClick={() => setFilter("lost")}
          style={{
            padding: "8px 12px",
            margin: "5px",
            backgroundColor: filter === "lost" ? "purple" : "#ddd",
            color: filter === "lost" ? "white" : "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Lost
        </button>
        <button
          onClick={() => setFilter("found")}
          style={{
            padding: "8px 12px",
            margin: "5px",
            backgroundColor: filter === "found" ? "purple" : "#ddd",
            color: filter === "found" ? "white" : "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Found
        </button>
      </div>

      {/* Main Content */}
      <main className={styles.dashboardContent}>
        <UserItems filter={filter} /> {/* Pass the filter as a prop */}
      </main>
    </div>
  );
};

export default Dashboard;
