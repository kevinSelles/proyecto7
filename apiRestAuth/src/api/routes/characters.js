const { auth, adminAuth } = require("../../middlewares/auth");
const { getCharacters, getCharacterById, getCharactersByCategory, postCharacter, putCharacter, deleteCharacter } = require("../controllers/characters");

const charactersRouter = require("express").Router();

charactersRouter.get("/category/:category", getCharactersByCategory);
charactersRouter.get("/:id", getCharacterById);
charactersRouter.get("/", getCharacters);
charactersRouter.post("/", [auth], postCharacter);
charactersRouter.put("/:id", [adminAuth], putCharacter);
charactersRouter.delete("/:id", [adminAuth], deleteCharacter);

module.exports = charactersRouter;