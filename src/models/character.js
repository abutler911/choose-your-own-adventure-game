const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  level: { type: Number, default: 1 },
  hitpoints: { type: Number, default: 100 },
  experience: { type: Number, default: 0 },
  magicpoints: { type: Number, default: 50 },
  attributes: {
    strength: { type: Number, default: 20, min: 0, max: 100 },
    agility: { type: Number, default: 20, min: 0, max: 100 },
    stamina: { type: Number, default: 20, min: 0, max: 100 },
    mana: { type: Number, default: 20, min: 0, max: 100 },
    intelligence: { type: Number, default: 20, min: 0, max: 100 },
    wisdom: { type: Number, default: 20, min: 0, max: 100 },
    charisma: { type: Number, default: 20, min: 0, max: 100 },
    stealth: { type: Number, default: 20, min: 0, max: 100 },
    resilience: { type: Number, default: 20, min: 0, max: 100 },
    luck: { type: Number, default: 20, min: 0, max: 100 },
    perception: { type: Number, default: 20, min: 0, max: 100 },
    endurance: { type: Number, default: 20, min: 0, max: 100 },
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
