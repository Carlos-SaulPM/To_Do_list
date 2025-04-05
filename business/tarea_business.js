const { tareaRepository } = require("../repositories");

const agregarTarea = async (dataTarea, dataUsuario) => {
  return await tareaRepository.agregarTarea(dataTarea, dataUsuario);
};
const obtenerTareas = async (usuario, opciones) => {
  return await tareaRepository.obtenerTareas(usuario, opciones);
};
const obtenerTarea = async (dataTarea, dataUsuario) => {
  return await tareaRepository.obtenerTarea(dataTarea, dataUsuario);
};
const buscarTareas = async (usuario, textoBusqueda, opciones) => {
  return await tareaRepository.buscarTareas(usuario, textoBusqueda, opciones);
};
const modificarTarea = async (dataTarea, dataUsuario) => {
  return await tareaRepository.modificarTarea(dataTarea, dataUsuario);
};
const eliminarTarea = async (dataTarea, dataUsuario) => {
  return await tareaRepository.eliminarTarea(dataTarea, dataUsuario);
};

module.exports = {
  agregarTarea,
  obtenerTareas,
  obtenerTarea,
  buscarTareas,
  modificarTarea,
  eliminarTarea,
};
