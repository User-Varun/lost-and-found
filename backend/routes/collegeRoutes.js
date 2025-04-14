const express = require("express");

const Router = express.Router();

// controllers
const collegeControllers = require("../controllers/collegeControllers");

Router.route("/")
  .post(collegeControllers.createCollege)
  .get(collegeControllers.getAllColleges);

module.exports = Router;
