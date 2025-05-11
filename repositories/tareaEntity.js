const { pool } = require("../config");
const { tareaModel } = require("../models");

class modelTarea {
  /**
   *
   * @param {tareaModel} tarea
   * @returns
   */

  static async agregarTarea(tarea) {
    const QUERY = `INSERT INTO tarea(id_usuario, titulo, descripcion) VALUES (?, ?, ?)`;
    const [result] = await pool.query(QUERY, [
      tarea.getId_usuario,
      tarea.getTitulo,
      tarea.getDescripcion,
    ]);
    return result;
  }

  //pendiente
  static async listarTareas(
    usuario,
    { textoBusqueda = "", estado, limit = 10, offset = 0 } = {}
  ) {
    let QUERY = `
    SELECT t.id_tarea, t.titulo, t.descripcion, 
           (SELECT e.estado FROM estado e WHERE e.id_tarea = t.id_tarea ORDER BY e.fecha_actualizacion DESC LIMIT 1) AS estado
    FROM tarea t
    WHERE t.id_usuario = ? AND t.estaActivo = 1
  `;

    const valores = [usuario.id];

    if (textoBusqueda) {
      QUERY += ` AND (t.titulo LIKE ? OR t.descripcion LIKE ?) `;
      const termino = `%${textoBusqueda}%`;
      valores.push(termino, termino);
    }

    if (estado !== undefined && estado !== "todos") {
      QUERY += ` AND (SELECT e.estado FROM estado e WHERE e.id_tarea = t.id_tarea ORDER BY e.fecha_actualizacion DESC LIMIT 1) = ? `;
      valores.push(estado);
    }

    QUERY += `LIMIT ? OFFSET ?`;
    valores.push(limit, offset);

    const [result] = await pool.query(QUERY, valores);
    return result;
  }

  /**
   * @param {tareaModel} tarea
   * @returns
   */
  static async obtenerTarea(tarea) {
    const QUERY = `
      SELECT titulo, descripcion
      FROM tarea 
      WHERE id_tarea = ? AND id_usuario = ? AND estaActivo = 1
    `;
    const [result] = await pool.query(QUERY, [
      tarea.getId_tarea,
      tarea.getId_usuario,
    ]);
    return result;
  }

  /**
   *
   * @param {tareaModel} tarea
   * @returns
   */
  static async modificarTarea(tarea) {
    if (tarea.getEstaActivo === 0) {
      const query = `
        UPDATE tarea SET estaActivo = 0 
        WHERE id_tarea = ? AND id_usuario = ? AND estaActivo = 1
      `;
      const [result] = await pool.query(query, [
        tarea.getId_tarea,
        tarea.getId_usuario,
      ]);
      return result;
    }

    if (tarea.getEstado !== undefined) {
      const query = `
        INSERT INTO estado(id_tarea, fecha_actualizacion, estado)
        VALUES(?, NOW(), ?);
      `;
      const [result] = await pool.query(query, [
        tarea.getId_tarea,
        tarea.getEstado,
      ]);
      return result;
    }

    const campos = [];
    const valores = [];

    if (tarea.getTitulo) {
      campos.push("titulo = ?");
      valores.push(tarea.getTitulo);
    }
    if (tarea.getDescripcion) {
      campos.push("descripcion = ?");
      valores.push(tarea.getDescripcion);
    }
    if (tarea.getEstado) {
      campos.push("estado = ?");
      valores.push(tarea.getEstado);
    }

    if (campos.length === 0) throw new Error("No hay campos para actualizar");

    const query = `
      UPDATE tarea 
      SET ${campos.join(", ")} 
      WHERE id_tarea = ? AND id_usuario = ? AND estaActivo = 1
    `;
    valores.push(tarea.getId_tarea, tarea.getId_usuario);

    const [result] = await pool.query(query, valores);
    return result;
  }

  /**
   *
   * @param {tareaModel} tarea
   * @returns
   */

  static async eliminarTarea(tarea) {
    return await this.modificarTarea(tarea);
  }
}

module.exports = modelTarea;
