const { adminAuth } = require("../../middlewares/auth");
const { getGames, getGameById, getGamesByYear, postGame, putGame, deleteGame } = require("../controllers/games");
const gamesRouter = require("express").Router();

gamesRouter.get("/year/:year", getGamesByYear);
gamesRouter.get("/:id", getGameById);
gamesRouter.get("/", getGames);
gamesRouter.post("/", [adminAuth], postGame);
gamesRouter.put("/:id", [adminAuth], putGame);
gamesRouter.delete("/:id", [adminAuth], deleteGame);

module.exports = gamesRouter;