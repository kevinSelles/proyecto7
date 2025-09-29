const Character = require("../models/characters");

const getCharacters = async (req, res, next) => {
  try {
    const characters = await Character.find();
    return res.status(200).json(characters);
  } catch (error) {
    return res.status(400).json({
      message: "Creo que visitaré a oculista, con la de personajes que hay y no veo a ninguno por aquí.",
      error: error.message});
  }
};
const getCharacterById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const character = await Character.findById(id);
    return res.status(200).json(character);
  } catch (error) {
    return res.status(400).json({
      message:"Vaya, parece que este personaje nos ha salido tímido, no quiere dejarse ver.",
      error: error.message});
  }
};
const getCharactersByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const characters = await Character.find({ category })
    return res.status(200).json(characters);
  } catch (error) {
    return res.status(400).json({
      message: "Principales, secundarios... A nadie le gusta sentirse menos importante que otros, así que no quieren mostrarse.",
      error: error.message});
  }
};
const postCharacter = async (req, res, next) => {
  try {
    const newCharacter = new Character(req.body);
    const characterSaved = await newCharacter.save();
    return res.status(201).json(characterSaved);
  } catch (error) {
    return res.status(400).json({
      message: "El enanito que está dentro de tu PC dándole forma a todo lo que escribes, se ha ido. No podremos publicarlo si no vuelve.",
      error: error.message});
  }
};
const putCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newCharacter = new Character(req.body);
    newCharacter._id = id;
    const characterUpdated = await Character.findByIdAndUpdate(id, newCharacter, {new: true,});
    return res.status(200).json(characterUpdated);
  } catch (error) {
    return res.status(400).json({
      message: "Este personaje está tan orgulloso de sí mismo que no me deja modificarlo.",
      error: error.message});
  }
};
const deleteCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const characterDeleted = await Character.findByIdAndDelete(id);
    return res.status(200).json(characterDeleted);
  } catch (error) {
    return res.status(400).json({
      message: "Comprende que a nadie le gusta ser borrado de la existencia, es normal que se resista.",
      error: error.message});
  }
};

module.exports = {
  getCharacters,
  getCharacterById,
  getCharactersByCategory,
  postCharacter,
  putCharacter,
  deleteCharacter
};