const { tareaRepository } = require("../repositories");

const listarTareas = async (usuario, opciones) => {
  return await tareaRepository.listarTareas(usuario, opciones);
};

const agregarTarea = async (dataTarea, dataUsuario) => {
  return await tareaRepository.agregarTarea(dataTarea, dataUsuario);
};

const obtenerTarea = async (dataTarea, dataUsuario) => {
  return await tareaRepository.obtenerTarea(dataTarea, dataUsuario);
};

const modificarTarea = async (dataTarea, dataUsuario) => {
  return await tareaRepository.modificarTarea(dataTarea, dataUsuario);
};

const eliminarTarea = async (dataTarea, dataUsuario) => {
  return await tareaRepository.eliminarTarea(dataTarea, dataUsuario);
};

module.exports = {
  listarTareas,
  agregarTarea,
  obtenerTarea,
  modificarTarea,
  eliminarTarea,
};
