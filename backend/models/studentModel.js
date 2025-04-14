const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "a student must have a name"],
  },
  email: {
    type: String,
    unique: [true, "Email address must be unique"],
    validate: [validator.isEmail, "please provide a valid email"],
  },
  mobileNo: {
    type: String,
    required: [true, "please provide your mobile number"],
    unique: [true, "phone number must be unique"],
    maxlength: 10,
    minlength: 10,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: ["student", "admin", "super-admin"],
    required: [true, "please choose your role"],
    default: "student",
  },
  collegeId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the College collection
    ref: "College", // Name of the College model
    required: [true, "A student must belong to a college"],
  },
  createdAt: Date,
  passwordConfirm: {
    type: String,
    required: [true, "Please comfirm your password"],
    // this only works on CREATE and SAVE!!!
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  passwordChangedAt: Date,
});

studentSchema.pre("save", async function (next) {
  // only run this fn if password was acctually modfied
  if (!this.isModified("password")) return next();

  // cost or salt = 12
  this.password = await bcrypt.hash(this.password, 12);

  // to remove from database
  this.passwordConfirm = undefined;
  next();
});

studentSchema.methods.correctPassword = async function (
  candidatePassoword,
  userPassword
) {
  return await bcrypt.compare(candidatePassoword, userPassword);
};

studentSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimeStamp;
  }

  // password not changed
  return false;
};

const studentModel = mongoose.model("Student", studentSchema);

module.exports = studentModel;
