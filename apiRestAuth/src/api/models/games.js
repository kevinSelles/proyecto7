const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    name: {type: String, required: true},
    year: {type: Number},
    img: {type: String, required: true},
    platform: {type: [String]},
    location: {type: [String]},
    synopsis: {type: String, required: true},
    mainCharacter: [{type: mongoose.Types.ObjectId, ref: "characters"}],
    secondaryCharacters: [{type: mongoose.Types.ObjectId, ref: "characters"}]
}, {
  timestamps: true,
  collection: "games"
});

const Game = mongoose.model("games", gameSchema, "games");

module.exports = Game;