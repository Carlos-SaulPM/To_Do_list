const { tareaModel } = require("../models");

const agregarTarea = async (dataTarea, dataUsuario) => {
  try {
    let result = tareaModel.agregarTarea(dataTarea, dataUsuario);
    return result;
  } catch (error) {
    console.error("Ocurrio un error al agregar la tarea");
  }
};
const obtenerTareas = async (usuario, opciones) => {
  return await tareaModel.obtenerTareas(usuario, opciones);
};
const obtenerTarea = async (dataTarea, dataUsuario) => {
  try {
    let result = tareaModel.obtenerTarea(dataTarea, dataUsuario);
    return result;
  } catch (error) {
    console.error("Ocurrio un error al obtener la tarea");
  }
};
const buscarTareas = async (usuario, textoBusqueda, opciones) => {
  return await tareaModel.buscarTareas(usuario, textoBusqueda, opciones);
};

const modificarTarea = async (dataTarea, dataUsuario) => {
  try {
    let result = tareaModel.modificarTarea(dataTarea, dataUsuario);
    return result;
  } catch (error) {
    console.error("Ocurrio un error al modificar la tarea");
  }
};
const eliminarTarea = async (dataTarea, dataUsuario) => {
  try {
    let result = tareaModel.eliminarTarea(dataTarea, dataUsuario);
    return result;
  } catch (error) {
    console.error("Ocurrio un error al eliminar el usuario");
  }
};

module.exports = {
  agregarTarea,
  obtenerTareas,
  obtenerTarea,
  buscarTareas,
  modificarTarea,
  eliminarTarea,
};
