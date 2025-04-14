import React, { useEffect, useState } from "react";
import axios from "axios";

const UserItems = ({ filter }) => {
  const [userItems, setUserItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/v1/items", {
          headers: {
            Authorization: `Bearer ${
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("jwt="))
                ?.split("=")[1]
            }`, // Include JWT token
          },
          params: {
            itemType: filter !== "all" ? filter : undefined, // Add filter as a query parameter
          },
        });

        setUserItems(response.data.data.items); // Set the fetched items
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user items. Please try again.");
        setLoading(false);
      }
    };

    fetchUserItems();
  }, [filter]); // Refetch items when the filter changes

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {userItems.map((item) => (
        <div
          key={item._id}
          style={{
            width: "300px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "15px",
            backgroundColor: "#fff",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>{item.itemName}</h3>
          <p>
            <strong>Type:</strong> {item.itemType}
          </p>
          <p>
            <strong>Description:</strong> {item.description}
          </p>
          <p>
            <strong>Date:</strong> {item.date || "Not provided"}
          </p>
          <p>
            <strong>Location:</strong> {item.location || "Not provided"}
          </p>
          <p>
            <strong>Contact Info:</strong> {item.contactInfo || "Not provided"}
          </p>
          {item.itemImages && item.itemImages.length > 0 && (
            <img
              src={item.itemImages[0].url}
              alt={item.itemName}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "5px",
                marginTop: "10px",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default UserItems;
