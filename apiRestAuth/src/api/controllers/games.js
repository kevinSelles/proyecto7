const Game = require("../models/games");

const getGames = async (req, res, next) => {
  try {
    const games = await Game.find()
    .populate("mainCharacter")
    .populate("secondaryCharacters");
    return res.status(200).json(games);
  } catch (error) {
    return res.status(400).json("Aquí debería de haber juegos... ¡No sé qué ha pasado!");
  }
};
const getGameById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const game = await Game.findById(id)
    .populate("mainCharacter")
    .populate("secondaryCharacters");
    return res.status(200).json(game);
  } catch (error) {
    return res.status(400).json("Seguro que lo tengo justo delante, pero por mucho que miro, no lo encuentro.");
  }
};
const getGamesByYear = async (req, res, next) => {
  try {
    const { year } = req.params;
    const games = await Game.find({ year })
    .populate("mainCharacter")
    .populate("secondaryCharacters");

     if (!games.length) {
      return res.status(404).json("Lo siento, pero no tengo juegos de ese año.");
    }

    return res.status(200).json(games);
  } catch (error) {
    return res.status(400).json("Con estas cosas tan antiguas cuesta acordarse, prueba de nuevo.");
  }
};
const postGame = async (req, res, next) => {
  try {
    const newGame = new Game(req.body);
    const gameSaved = await newGame.save();
    return res.status(201).json(gameSaved);
  } catch (error) {
    return res.status(400).json("Me vas a matar pero... No consigo publicar tu juego. Tanto trabajo para nada.");
  }
};
const putGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldGame = await Game.findById(id);

    const newGame = new Game(req.body);
    newGame._id = id;
    newGame.mainCharacter = [...oldGame.mainCharacter, ...(req.body.mainCharacter || [])];
    newGame.secondaryCharacters = [...oldGame.secondaryCharacters, ...(req.body.secondaryCharacters || [])];

    const gameUpdated = await Game.findByIdAndUpdate(id, newGame, {new: true,});
    return res.status(200).json(gameUpdated);
  } catch (error) {
    return res.status(400).json("El becario que hizo la web debió configurar algo mal, porque no consigo modificar el juego.");
  }
};
const deleteGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const gameDeleted = await Game.findByIdAndDelete(id);
    return res.status(200).json(gameDeleted);
  } catch (error) {
    return res.status(400).json("Pues si que está bien pegado este juego a la web, no consigo quitarlo.");
  }
};

module.exports = {
  getGames,
  getGameById,
  getGamesByYear,
  postGame,
  putGame,
  deleteGame
};