const { tareaModel } = require("../models");

const listarTareas = async (usuario, opciones) => {
  return await tareaModel.listarTareas(usuario, opciones);
};

const agregarTarea = async (dataTarea, dataUsuario) => {
  return await tareaModel.agregarTarea(dataTarea, dataUsuario);
};

const obtenerTarea = async (dataTarea, dataUsuario) => {
  return await tareaModel.obtenerTarea(dataTarea, dataUsuario);
};

const modificarTarea = async (dataTarea, dataUsuario) => {
  return await tareaModel.modificarTarea(dataTarea, dataUsuario);
};

const eliminarTarea = async (dataTarea, dataUsuario) => {
  return await tareaModel.eliminarTarea(dataTarea, dataUsuario);
};

module.exports = {
  listarTareas,
  agregarTarea,
  obtenerTarea,
  modificarTarea,
  eliminarTarea,
};
