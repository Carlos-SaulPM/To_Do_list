const { usuarioRepository } = require("../repositories");

const crearNuevoUsuario = async (datosUsuario) => {
  return await usuarioRepository.crearNuevoUsuario(datosUsuario)
};

const obtenerUsuario = async (datosUsuario) => {
  const usuario = await usuarioRepository.obtenerUsuario(datosUsuario);
  return usuario;
};
const compararPassword = async (datosUsuario) => {
  let dbPassword = await usuarioRepository.obtenerPassword(datosUsuario)
  if (!dbPassword || datosUsuario.password !== dbPassword.password ) return false
  return true;
};
module.exports = { crearNuevoUsuario, obtenerUsuario, compararPassword };
