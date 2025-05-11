const { pool } = require("../config");

class tareaModel {
  #id_tarea;
  #id_usuario;
  #titulo;
  #descripcion;
  #estaActivo;
  #estado;

  /**
   * @param {Number} id_tarea
   * @param {Number} id_usuario
   * @param {String} titulo
   * @param {String} descripcion
   * @param {Number} estaActivo
   */
  constructor(
    id_tarea,
    id_usuario,
    titulo,
    descripcion,
    estaActivo = null,
    estado
  ) {
    
    if (typeof id_tarea !== "number" && typeof id_usuario !== "number")
      throw new Error("Id_tarea o Id_usuario no son numeros");

    this.#id_tarea = id_tarea;
    this.#id_usuario = id_usuario;
    this.#titulo = titulo;
    this.#descripcion = descripcion;
    this.#estaActivo = estaActivo;
    this.#estado = estado;
  }
  
  /**
   * Crea un objeto de tipo tareaModel para guardarlo en la DB
   * @param {Number} id_usuario 
   * @param {String} titulo 
   * @param {String} descripcion 
   * @returns {tareaModel}
   */
  static tareaParaGuardar(id_usuario, titulo, descripcion) {
    if (!id_usuario || !titulo || !descripcion)
      throw new Error("Campos no definidos de la tarea");

    return new tareaModel(
      null,
      id_usuario,
      titulo,
      descripcion,
      1
    );
  }

  /**
   * Crea un objeto de tipo tareaModel para obtener el resultado de un registro en la DB
   * @param {Number} id_tarea 
   * @param {Number} id_usuario 
   * @returns {tareaModel}
   */
  static tareaParaObtener(id_tarea, id_usuario) {
    return new tareaModel(id_tarea, id_usuario);
  }

  /**
   * Retorna un objeto tareaModel para eliminar en la DB
   * @param {Number} id_tarea 
   * @param {Number} id_usuario 
   * @param {*} estaActivo 
   * @returns {tareaModel}
   */

  static tareaParaEliminar(id_tarea, id_usuario, estaActivo) {
    return new tareaModel(id_tarea, id_usuario, null, null, estaActivo);
  }

  get getId_tarea() {
    return this.#id_tarea;
  }
  get getId_usuario() {
    return this.#id_usuario;
  }
  get getTitulo() {
    return this.#titulo;
  }
  get getDescripcion() {
    return this.#descripcion;
  }
  get getEstaActivo() {
    return this.#estaActivo;
  }
  get getEstado() {
    return this.#estado;
  }
  
  set setEstado(estado) {
    this.#estado = estado;
  }
}

module.exports = tareaModel;
