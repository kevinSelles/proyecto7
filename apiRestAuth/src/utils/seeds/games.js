require("dotenv").config();
const mongoose = require("mongoose");
const { connectDB } = require("../../config/db");
const Game = require("../../api/models/games");
const games = require("./data/games.json");

const seedGames = async () => {
  try {
    await connectDB();

    await Game.deleteMany();
    console.log("Juegos borrados");

    await Game.insertMany(games);
    console.log("Juegos creados");
  } catch (error) {
    console.error("Error al cargar la semilla", error);
  } finally {
    await mongoose.disconnect();
    console.log("Conexión a la BBDD cerrada");
  }
};

seedGames();