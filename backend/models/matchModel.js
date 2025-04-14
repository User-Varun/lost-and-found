const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  lostItemId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the lost item
    ref: "Item", // Assuming the lost and found items are stored in an "Item" model
    required: [true, "Match must have a lost item"],
  },
  foundItemId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the found item
    ref: "Item",
    required: [true, "Match must have a found item"],
  },
  collegeId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the college
    ref: "College",
    required: [true, "Match must belong to a college"],
  },
  status: {
    type: String,
    enum: ["pending", "resolved"],
    default: "pending", // Matches are pending by default
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
