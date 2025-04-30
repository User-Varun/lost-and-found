const express = require("express");
const Router = express.Router();

// Controllers
const authControllers = require("../controllers/authControllers");

Router.post("/signup", authControllers.signup);
Router.post("/login", authControllers.login);

module.exports = Router;
