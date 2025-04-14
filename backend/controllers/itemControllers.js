const Item = require("../models/itemModel");
const catchAsync = require("../utills/catchAsync");
const QRCode = require("qrcode");

exports.createItem = catchAsync(async (req, res) => {
  const {
    itemType,
    itemName,
    description,
    date,
    location,
    contactInfo,
    itemImages,
  } = req.body;

  // Create a new item and associate it with the authenticated user and their college
  const newItem = await Item.create({
    itemType, // "lost" or "found"
    itemName,
    description,
    date,
    location,
    contactInfo,
    itemImages,
    userId: req.user._id, // Attach the user ID from the authenticated request
    collegeId: req.user.collegeId, // Attach the user's college
  });

  res.status(201).json({
    status: "success",
    data: {
      item: newItem,
    },
  });
});

exports.getAllItems = catchAsync(async (req, res) => {
  const { itemType } = req.query; // Optional query parameter to filter by "lost" or "found"

  // Build the query object
  const query = { collegeId: req.user.collegeId }; // Filter by the user's college
  if (itemType) {
    query.itemType = itemType; // Add itemType filter if provided
  }

  // Fetch items based on the query
  const items = await Item.find(query);

  res.status(200).json({
    status: "success",
    results: items.length,
    data: {
      items,
    },
  });
});

exports.getUserItems = catchAsync(async (req, res) => {
  const { itemType } = req.query;

  const query = { collegeId: req.user._id };

  if (itemType) {
    query.itemType = itemType; // Add itemType filter if provided
  }

  // Fetch all items created by the logged-in user
  const userItems = await Item.find(query);

  res.status(200).json({
    status: "success",
    results: userItems.length,
    data: {
      items: userItems,
    },
  });
});

exports.getItemById = catchAsync(async (req, res) => {
  const { id } = req.params; // Extract the item ID from the request parameters

  // Find the item by ID
  const item = await Item.findById(id);

  // If the item is not found, return a 404 error
  if (!item) {
    return res.status(404).json({
      status: "fail",
      message: "No item found with that ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      item,
    },
  });
});

exports.updateItem = catchAsync(async (req, res) => {
  const { id } = req.params; // Extract the item ID from the request parameters

  // Find the item by ID and update it with the provided data
  const updatedItem = await Item.findByIdAndUpdate(id, req.body, {
    new: true, // Return the updated document
    runValidators: true, // Run schema validators on the updated data
  });

  // If the item is not found, return a 404 error
  if (!updatedItem) {
    return res.status(404).json({
      status: "fail",
      message: "No item found with that ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      item: updatedItem,
    },
  });
});

exports.deleteItem = catchAsync(async (req, res) => {
  const { id } = req.params; // Extract the item ID from the request parameters

  // Find the item by ID and delete it
  const deletedItem = await Item.findByIdAndDelete(id);

  // If the item is not found, return a 404 error
  if (!deletedItem) {
    return res.status(404).json({
      status: "fail",
      message: "No item found with that ID",
    });
  }

  res.status(204).json({
    status: "success",
    data: null, // No content for delete response
  });
});

exports.generateQRCode = catchAsync(async (req, res) => {
  const { id } = req.params; // Extract the item ID from the request parameters

  // Find the item by ID
  const item = await Item.findById(id);

  // If the item is not found, return a 404 error
  if (!item) {
    return res.status(404).json({
      status: "fail",
      message: "No item found with that ID",
    });
  }

  // Generate a QR code with the item's details or a URL
  const qrData = `${req.protocol}://${req.get("host")}/api/v1/items/${id}`; // Example: URL to the item's details
  const qrCode = await QRCode.toDataURL(qrData); // Generate QR code as a base64 string

  // Send the QR code as a response
  res.status(200).json({
    status: "success",
    data: {
      qrCode, // Base64-encoded QR code
    },
  });
});
