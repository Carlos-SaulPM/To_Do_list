const { tareaModel } = require("../models");

const agregarTarea = async (dataTarea, dataUsuario) => {
  try {
    let result = tareaModel.agregarTarea(dataTarea, dataUsuario);
    return result;
  } catch (error) {
    console.error("Ocurrio un error al agregar la tarea");
  }
};
const obtenerTareas = async (dataUser, limit, pagina) => {
  try {
    let offset = (pagina - 1) * limit;
    let result = tareaModel.obtenerTareas(dataUser, limit, offset);
    return result;
  } catch (error) {
    console.error("Ocurrio un error al obtener las tareas ");
  }
};
const obtenerTarea = async (dataTarea, dataUsuario) => {
  try {
    let result = tareaModel.obtenerTarea(dataTarea, dataUsuario);
    return result;
  } catch (error) {
    console.error("Ocurrio un error al obtener la tarea");
  }
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
  modificarTarea,
  eliminarTarea,
};
