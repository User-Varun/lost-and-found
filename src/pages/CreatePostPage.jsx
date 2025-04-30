import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CreatePostPage() {
  const [formData, setFormData] = useState({
    itemType: "Lost",
    itemName: "",
    description: "",
    date: "",
    location: "",
    contactInfo: "",
    itemImages: null, // This is the File object
  });

  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] }); // Store file object
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const cloudName = "dbrsc5qok"; // Replace with your Cloudinary cloud name
    const uploadPreset = "unsigned_present"; // Replace with your unsigned preset name

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    return {
      public_id: res.data.public_id,
      url: res.data.secure_url,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = Cookies.get("jwt");

    try {
      setIsUploading(true);

      let imageData = null;
      if (formData.itemImages) {
        // Upload image to Cloudinary
        imageData = await uploadImageToCloudinary(formData.itemImages);
      }

      const postData = {
        itemType: formData.itemType,
        itemName: formData.itemName,
        description: formData.description,
        date: formData.date,
        location: formData.location,
        contactInfo: formData.contactInfo,
        itemImages: imageData ? imageData : null, // Send object or null
      };

      // Send all form data + uploaded image info to backend
      const response = await api.post("/api/v1/items", postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Post successfully created", response);
      alert("Post created successfully!");

      // Reset form
      setFormData({
        itemType: "Lost",
        itemName: "",
        description: "",
        date: "",
        location: "",
        contactInfo: "",
        itemImages: null,
      });
    } catch (err) {
      console.error("Error creating post!", err);
      alert("Failed to create post");
    } finally {
      setIsUploading(false);
      // send user to home page;
      navigate("/");
    }
  };

  return (
    <form
      className="bg-[#a1d3ff] p-[2rem] rounded-[1rem] flex flex-col  gap-[1rem]"
      onSubmit={handleSubmit}
    >
      <h1>Create a Lost or Found item Post</h1>

      <div>
        <label htmlFor="itemType">Is the item lost or found?</label>
        <select
          name="itemType"
          className="w-[100%] rounded-[0.4rem] p-[0.5rem]"
          value={formData.itemType}
          onChange={handleChange}
        >
          <option>Lost</option>
          <option>Found</option>
        </select>
      </div>

      <div>
        <label htmlFor="itemName">Name of the item?</label>
        <input
          type="text"
          name="itemName"
          placeholder="e.g. red powerbank"
          value={formData.itemName}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="description">Any other details?</label>
        <input
          type="text"
          name="description"
          placeholder="e.g. it has smiley sticker on it"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="date">Date?</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="location">Location would be helpful</label>
        <input
          type="text"
          name="location"
          placeholder="e.g. at technology building room no. 302"
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="contactInfo">Your contact no.?</label>
        <input
          type="number"
          name="contactInfo"
          placeholder="your mobile number.."
          value={formData.contactInfo}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center">
        <label htmlFor="itemImages" className="min-w-[8.7rem]">
          Upload item image
        </label>
        <input
          type="file"
          name="itemImages"
          accept="image/*"
          onChange={handleChange}
        />
        {formData.itemImages && (
          <span className="ml-2 text-sm text-gray-700">
            {formData.itemImages.name}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isUploading}
        className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
      >
        {isUploading ? "Uploading..." : "Submit"}
      </button>
    </form>
  );
}
