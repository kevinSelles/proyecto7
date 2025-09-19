const { generateKey } = require("../../config/jwt");
const User = require("../models/users");
const bcrypt = require("bcrypt");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error);
  }
}

const postUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    newUser.rol = "user";

    const duplicateUser = await User.findOne({userName: newUser.userName});
    if(duplicateUser !== null) {
      return res.status(400).json("Estuviste lento y alguien te quitó el nombre. Prueba con otro que no esté en uso");
    };

    const duplicateEmail = await User.findOne({email: newUser.email});
    if(duplicateEmail !== null) {
      return res.status(400).json("Intenta ser un poco más original y búscate un email que no esté usando otro usuario");
    };

    const userSaved = await newUser.save();

    return res.status(201).json(userSaved);
  } catch (error) {
    return res.status(400).json(error);
  }
}

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({userName: req.body.userName})

    if(user === null) {
      return res.status(400).json("Este usuario ni siquiera existe, ¿Has bebido mucho hoy?");
    }
    if(bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateKey(user._id);
      return res.status(200).json({ user, token });
    } else {
      return res.status(400).json("Contraseña incorrecta, concéntrate, en lo más profundo de tu ser, hallarás la contraseña");
    };
  } catch (error) {
    return res.status(400).json(error);
  }
}

const putUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if(req.user._id.toString() !== id && req.user.rol !== "amin") {
      return res.status(400).json("Por favor, no molestes a otros usuarios.");
    }

    if (req.user.rol !== "admin" && req.body.rol) {
      delete req.body.rol;
      return res.status(400).json("Un gran poder, conlleva una gran responsabilidad y tú aún no estás preparado.");
    }

    const newUser = new User(req.body);
    newUser._id = id;
    const userUpdated = await User.findByIdAndUpdate(id, newUser, {new: true,});
    return res.status(200).json(userUpdated);
  } catch (error) {
    return res.status(400).json("El usuario se resiste a ser modificado");
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if(req.user._id.toString() !== id && req.user.rol !== "amin") {
    return res.status(403).json("Borrar a otros usuarios sin su permiso está feo, consúltalo con un administrador");
    }

    const userDeleted = await User.findByIdAndDelete(id);
    return res.status(200).json(userDeleted);
  } catch (error) {
    return res.status(400).json("El usuario es más poderoso que el sistema, algo falla.");
  }
}

module.exports = { getUsers, postUser, login, deleteUser, putUser };