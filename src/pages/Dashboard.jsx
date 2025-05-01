import "../index.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "../css/dashboard.module.css";
import UserItems from "../components/userItems"; // Import the UserItems component

import SortButton from "../components/SortButton";

function CreatePostButton() {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    console.log("handler");

    navigate("/create-post");
  };

  return (
    <button className="text-[#fff] w-auto" onClick={handleCreatePost}>
      Create Post
    </button>
  );
}

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear JWT from cookies
    Cookies.remove("jwt");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="w-[5rem] py-[10px] rounded-md">
      Logout
    </button>
  );
}

const Dashboard = () => {
  // State to track the selected filter
  const [filter, setFilter] = useState("all");

  const studentName = Cookies.get("name");

  if (!studentName) {
    throw new Error("Cannot get the info from db");
  }

  return (
    <div className="flex flex-col h-screen font-[Arial, sans-serif] ">
      {/* Fixed Header */}
      <nav className="flex justify-between bg-[#a1d3ff] items-center pt-[0.4rem] pb-[0.4rem] pr-[2rem] pl-[2rem] text-black">
        <h1 className="show-on-large font-bold text-black">Lost&Found</h1>
        <CreatePostButton />
        <div className="flex gap-[2rem] items-center ">
          <p className=" show-on-large  min-w-[5.6rem] text-black font-[600] ">
            {studentName}
          </p>
          <LogoutButton></LogoutButton>
        </div>
      </nav>

      {/* Filter Section */}
      <div className="flex text-center p-[10px] bg-[#f8f9fa] items-center">
        <p className="text-[#000] min-w-[5rem]">Sort by</p>

        <SortButton currentFilter={filter} setFilter={setFilter}>
          all
        </SortButton>
        <SortButton currentFilter={filter} setFilter={setFilter}>
          Lost
        </SortButton>
        <SortButton currentFilter={filter} setFilter={setFilter}>
          Found
        </SortButton>
      </div>

      {/* Main Content */}
      <main className={styles.dashboardContent}>
        <UserItems filter={filter} /> {/* Pass the filter as a prop */}
      </main>
    </div>
  );
};

export default Dashboard;
