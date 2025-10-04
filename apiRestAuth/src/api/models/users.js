const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
    rol: { type: String, required: true, enum: ["admin", "user"], default: "user"},
    createdGames: [{ type: mongoose.Types.ObjectId, ref: "games" }]
  },
  {
    timestamps: true,
    collection: "users"
  }
)

userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model("users", userSchema, "users");

module.exports = User;