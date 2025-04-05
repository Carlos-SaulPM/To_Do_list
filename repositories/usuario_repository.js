const { usuarioModel } = require("../models");

const crearNuevoUsuario = async (datosUsuario) => {
  try {
    let result = await usuarioModel.crearNuevoUsuario(datosUsuario);
    return result;
  } catch (error) {
    console.error("Ocurrio un error al crear un nuevo usuario", error);
  }
};

const obtenerUsuario = async (datosUsuario) => {
  try {
    let result = await usuarioModel.obtenerUsuario(datosUsuario);
    return result;
  } catch (error) {
    console.error("Error al obtener usuario: ", error);
  }
};

const obtenerPassword = async (datosUsuario) => {
  try {
    let result = await usuarioModel.obtenerContrasena(datosUsuario);
    return result[0];
  } catch (error) {
    console.error("Error al obtener comparar password: ", error);
  }
};

module.exports = { crearNuevoUsuario,obtenerUsuario, obtenerPassword };
