const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  // mongoose schema
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = new model("user", userSchema);
