const { Schema, model, ObjectId } = require("mongoose");
const User = require("./User");

const sessionSchema = new Schema({
  // mongoose schema
  userId: { type: ObjectId, required: true, ref: User },
});

module.exports = new model("session", sessionSchema);
