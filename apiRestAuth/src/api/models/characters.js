const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    game: {type: [String], required: true},
    img: {type: String, required: true},
    biography: {type: String, required: true}
}, {
  timestamps: true,
  collection: "characters"
});

const Character = mongoose.model("characters", characterSchema, "characters");

module.exports = Character;