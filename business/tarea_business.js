const { tareaRepository } = require("../repositories");

const agregarTarea = async (dataTarea, dataUsuario) => {
  return await tareaRepository.agregarTarea(dataTarea, dataUsuario);
};
const obtenerTareas = async (dataUsuario, limit, pagina) => {
  return await tareaRepository.obtenerTareas(dataUsuario, limit, pagina);
};
const obtenerTarea = async (dataTarea, dataUsuario) => {
  return await tareaRepository.obtenerTarea(dataTarea, dataUsuario);
};
const buscarTareas = async (dataUsuario, textoBusqueda, limit, pagina) => {
  return await tareaRepository.buscarTareas(dataUsuario, textoBusqueda, limit, pagina);
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
