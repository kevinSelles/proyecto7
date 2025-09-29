require("dotenv").config();
const mongoose = require("mongoose");
const { connectDB } = require("../../config/db");
const Character = require("../../api/models/characters");
const characters = require("./data/characters.json");

const seedCharacters = async () => {
  try {
    await connectDB();

    await Character.deleteMany();
    console.log("Personajes borrados");

    await Character.insertMany(characters);
    console.log("Personajes creados");
  } catch (error) {
    console.error("Error al cargar la semilla", error);
  } finally {
    await mongoose.disconnect();
    console.log("Conexión a la BBDD cerrada");
  }
};

seedCharacters();