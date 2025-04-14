const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

// cloudnary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Replace with your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY, // Replace with your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Replace with your Cloudinary API secret
});

module.exports = cloudinary;
