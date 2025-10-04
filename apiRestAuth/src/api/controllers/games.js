const Game = require("../models/games");

const getGames = async (req, res, next) => {
  try {
    const games = await Game.find()
    .populate("mainCharacter")
    .populate("secondaryCharacters");
    return res.status(200).json(games);
  } catch (error) {
    return res.status(500).json({
      message: "Aquí debería de haber juegos... ¡No sé qué ha pasado!",
      error: error.message});
  }
};

const getGameById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const game = await Game.findById(id)
    .populate("mainCharacter")
    .populate("secondaryCharacters");

    if (!game) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }

    return res.status(200).json(game);
  } catch (error) {
    return res.status(500).json({
      message: "Seguro que lo tengo justo delante, pero por mucho que miro, no lo encuentro.",
      error: error.message});
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
    return res.status(400).json({
      message: "Con estas cosas tan antiguas cuesta acordarse, prueba de nuevo.",
      error: error.message});
  }
};

const postGame = async (req, res, next) => {
  try {
    const newGame = new Game(req.body);
    const gameSaved = await newGame.save();

    if (req.user) {
      try {
        await require("../models/users").findByIdAndUpdate(req.user._id, {
          $addToSet: { createdGames: gameSaved._id }
        });
      } catch (userError) {
        console.error("No se pudo actualizar createdGames:", userError);
      }
    }

    return res.status(201).json(gameSaved);
  } catch (error) {
    return res.status(500).json({
      message: "Me vas a matar pero... No consigo publicar tu juego. Tanto trabajo para nada.",
      error: error.message});
  }
};

const putGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldGame = await Game.findById(id);

    if (!oldGame) return res.status(404).json("Juego no encontrado");

    const updateData = {
      ...req.body,
      mainCharacter: [...new Set([...oldGame.mainCharacter, ...(req.body.mainCharacter || [])])],
      secondaryCharacters: [...new Set([...oldGame.secondaryCharacters, ...(req.body.secondaryCharacters || [])])]
    };

    const gameUpdated = await Game.findByIdAndUpdate(id, updateData, { new: true })
      .populate("mainCharacter")
      .populate("secondaryCharacters");

    return res.status(200).json(gameUpdated);
  } catch (error) {
    return res.status(500).json({
      message: "El becario que hizo la web debió configurar algo mal, porque no consigo modificar el juego.",
      error: error.message});
  }
};
const deleteGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const gameDeleted = await Game.findByIdAndDelete(id);
    return res.status(200).json(gameDeleted);
  } catch (error) {
    return res.status(500).json({
      message: "Pues si que está bien pegado este juego a la web, no consigo quitarlo.",
      error: error.message});
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