const express = require("express");

const Router = express.Router();

//controllers
const itemControllers = require("../controllers/itemControllers");
const authControllers = require("../controllers/authControllers");

Router.route("/upload").post(
  authControllers.protect,
  itemControllers.uploadImage
);

Router.route("/")
  .post(authControllers.protect, itemControllers.createItem)
  .get(authControllers.protect, itemControllers.getAllItems);

// Get all users items
Router.get("/myItems", authControllers.protect, itemControllers.getUserItems);

Router.route("/:id")
  .get(authControllers.protect, itemControllers.getItemById)
  .patch(authControllers.protect, itemControllers.updateItem)
  .delete(authControllers.protect, itemControllers.deleteItem);

Router.get("/:id/qr", authControllers.protect, itemControllers.generateQRCode);

module.exports = Router;
