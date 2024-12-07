const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: { type: String, required: [true, "Username field is required"] },
  email: {
    type: String,
    required: [true, "Email field is required"],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
    unique: true,
  },
  password: { type: String, required: [true, "Password field is required"] },
  when: { type: Date, required: [true, "Current Date is required"] },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
