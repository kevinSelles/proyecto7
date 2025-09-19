require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const gamesRouter = require("./src/api/routes/games");
const charactersRouter = require("./src/api/routes/characters");
const usersRouter = require("./src/api/routes/users");

const app = express();

app.use(express.json());

connectDB();

app.use("/api/v1/games", gamesRouter);
app.use("/api/v1/characters", charactersRouter);
app.use("/api/v1/users", usersRouter);

app.use((req, res, next) => {
  return res.status(404).json("Route not found");
})

app.listen(3000, () => {
  console.log("Servidor levantado en http://localhost:3000");
})