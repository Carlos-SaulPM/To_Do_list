const { pool } = require("../config");

class modelTarea {
  static async agregarTarea(tarea, usuario) {
    const QUERY =
      "INSERT INTO tarea(id_uso, titulo, descripcion) VALUES (?, ?, ?)";
    const [result] = await pool.query(QUERY, [
      usuario.id,
      tarea.titulo,
      tarea.descripcion,
    ]);
    return result;
  }

  static async listarTareas(
    usuario,
    { textoBusqueda = "", estado, limit = 10, offset = 0 } = {}
  ) {
    let QUERY = `
    SELECT t.id_tra, t.titulo, t.descripcion, 
           (SELECT e.estado FROM estado e WHERE e.id_tra = t.id_tra ORDER BY e.fecha_actualizacion DESC LIMIT 1) AS estado
    FROM tarea t
    WHERE t.id_uso = ? AND t.estaActivo = 1
  `;

    const valores = [usuario.id];

    if (textoBusqueda) {
      QUERY += ` AND (t.titulo LIKE ? OR t.descripcion LIKE ?) `;
      const termino = `%${textoBusqueda}%`;
      valores.push(termino, termino);
    }

    if (estado !== undefined && estado !== "todos") {
      QUERY += ` AND (SELECT e.estado FROM estado e WHERE e.id_tra = t.id_tra ORDER BY e.fecha_actualizacion DESC LIMIT 1) = ? `;
      valores.push(estado);
    }

    QUERY += ` LIMIT ? OFFSET ?`;
    valores.push(limit, offset);

    const [result] = await pool.query(QUERY, valores);
    return result;
  }

  static async obtenerTarea({ id }, { id: idTarea }) {
    const QUERY = `
      SELECT titulo, descripcion, estado 
      FROM tarea 
      WHERE id_tra = ? AND id_uso = ? AND estaActivo = 1
    `;
    const [result] = await pool.query(QUERY, [idTarea, id]);
    return result;
  }

  static async modificarTarea(tarea, usuario) {
    if (!tarea?.id || !usuario?.id) throw new Error("Datos inválidos");

    // Si es eliminación lógica
    if (tarea.estaActivo === 0) {
      const query = `
        UPDATE tarea SET estaActivo = 0 
        WHERE id_tra = ? AND id_uso = ? AND estaActivo = 1
      `;
      const [result] = await pool.query(query, [tarea.id, usuario.id]);
      return result;
    }

    const campos = [];
    const valores = [];

    if (tarea.titulo) {
      campos.push("titulo = ?");
      valores.push(tarea.titulo);
    }
    if (tarea.descripcion) {
      campos.push("descripcion = ?");
      valores.push(tarea.descripcion);
    }
    if (tarea.estado) {
      campos.push("estado = ?");
      valores.push(tarea.estado);
    }

    if (campos.length === 0) throw new Error("No hay campos para actualizar");

    const query = `
      UPDATE tarea 
      SET ${campos.join(", ")} 
      WHERE id_tra = ? AND id_uso = ? AND estaActivo = 1
    `;
    valores.push(tarea.id, usuario.id);

    const [result] = await pool.query(query, valores);
    return result;
  }

  static async eliminarTarea(tarea, usuario) {
    return await this.modificarTarea({ id: tarea.id, estaActivo: 0 }, usuario);
  }
}

module.exports = modelTarea;
