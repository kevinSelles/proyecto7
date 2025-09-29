const User = require("../api/models/users");
const { verifyToken } = require("../config/jwt");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const parsedToken = token.replace("Bearer ", "");
    
    const { id } = verifyToken(parsedToken);
    const user = await User.findById(id);
    user.password =null;
    req.user = user;
    
    next()
  } catch (error) {
    return res.status(400).json({
      message: "Nooo!... Puedes!... Pasar!  By Gandalf",
      error: error.message});
  }
}

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const parsedToken = token.replace("Bearer ", "");
    
    const { id } = verifyToken(parsedToken);
    const user = await User.findById(id);

    if (user.rol === "admin") {
      user.password =null;
      req.user = user;
      next()
    } else {
      return res.status(400).json("No tienes poder aquí, pero puedes consultarle a un administrador");
    }
    
  } catch (error) {
    return res.status(400).json({
      message: "Nooo!... Puedes!... Pasar!  By Gandalf",
      error: error.message});
  }
}

module.exports = { auth, adminAuth }