const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    accountNumber: String,
    email: String,
    password: String,
    identityNumber: String,
  })
);

module.exports = User;
