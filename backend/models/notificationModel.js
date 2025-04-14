const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User (Student or Admin)
    ref: "Student", // Assuming notifications are for students
    required: [true, "Notification must belong to a user"],
  },
  message: {
    type: String,
    required: [true, "Notification must have a message"],
  },
  isRead: {
    type: Boolean,
    default: false, // Notifications are unread by default
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
