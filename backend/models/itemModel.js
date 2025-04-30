const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemType: {
    type: String,
    enum: ["Lost", "Found"],
    required: [true, "A Item must have a type"],
  },

  itemName: {
    type: String,
    required: [true, "Item must have a title"],
  },
  description: {
    type: String,
    required: [true, "Item must have a description"],
  },
  date: {
    type: String,
    default: "Not given",
  },
  location: {
    type: String,
    default: "Not given",
  },

  contactInfo: {
    type: String,
    default: "Not Given",
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the user who reported the item
    ref: "Student",
    required: [true, "Item must belong to a user"],
  },
  itemImages: {
    public_id: {
      type: String, // Cloudinary public ID for managing the image
      required: true,
    },
    url: {
      type: String, // URL of the image stored in Cloudinary
      required: true,
    },
  },

  collegeId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the college
    ref: "College",
    required: [true, "Item must belong to a college"],
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
