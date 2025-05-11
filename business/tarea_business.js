const { tareaModel } = require("../models");
const { tareaRepository } = require("../repositories");

/**
 * @param {} usuario
 * @returns
 */
const listarTareas = async (usuario, opciones) => {
  return await tareaRepository.listarTareas(usuario, opciones);
};

/**
 * @param {tareaModel} tarea
 * @returns
 */

const agregarTarea = async (tarea) => {
  return await tareaRepository.agregarTarea(tarea);
};

/**
 * @param {tareaModel} tarea
 * @returns
 */
const obtenerTarea = async (tarea) => {
  return await tareaRepository.obtenerTarea(tarea);
};

/**
 * @param {tareaModel} tarea
 * @returns
 */
const modificarTarea = async (tarea) => {
  return await tareaRepository.modificarTarea(tarea);
};

/**
 * @param {tareaModel} tarea
 * @returns
 */
const eliminarTarea = async (tarea) => {
  return await tareaRepository.eliminarTarea(tarea);
};

module.exports = {
  listarTareas,
  agregarTarea,
  obtenerTarea,
  modificarTarea,
  eliminarTarea,
};
