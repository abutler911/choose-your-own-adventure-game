const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  strength: { type: Number, required: true },
  stamina: { type: Number, required: true },
  // Will add more
});

// User schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  character: characterSchema,
});

// Create models
const User = mongoose.model("User", userSchema);

module.exports = User;
