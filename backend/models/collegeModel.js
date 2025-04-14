const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Please provide the college Name"],
  },

  address: {
    type: String,
    required: [true, "Please provide a Address"],
  },

  contactEmail: {
    type: String,
    required: [true, "A college must a contact email"],
  },

  createdAt: Date,
});

const collegeModel = mongoose.model("College", collegeSchema);

module.exports = collegeModel;
