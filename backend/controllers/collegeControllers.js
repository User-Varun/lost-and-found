const CollegeModel = require("../models/collegeModel");
const catchAsync = require("../utills/catchAsync");

module.exports.createCollege = async (req, res) => {
  try {
    const newCollege = await CollegeModel.create({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      contactEmail: req.body.contactEmail,
    });

    res.status(201).json({
      status: "success",
      college: newCollege,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports.getAllColleges = catchAsync(async (req, res) => {
  const colleges = await CollegeModel.find(); // Fetch all colleges

  res.status(200).json({
    status: "success",
    results: colleges.length,
    data: {
      colleges,
    },
  });
});
