const { pool } = require("../config");

class modelTarea {
  static async agregarTarea(tarea, usuario) {
    console.log("USUARIO AGREGAR TAREA:",usuario);
    const QUERY =
      "INSERT INTO tarea(id_uso, titulo, descripcion) VALUES (?,?,?)";
    const [result] = await pool.query(QUERY, [usuario.id, ...Object.values(tarea)]);
    return result;
  }
  //Considerando paginado
  static async obtenerTareas(usuario, limit, offset) {
    const QUERY =
      "SELECT id_tra, titulo, descripcion FROM tarea WHERE id_uso=? AND estaActivo=1 LIMIT ? OFFSET ? ";
    const [result] = await pool.query(QUERY, [usuario.id, limit, offset]);
    return result;
  }

  static async obtenerTarea(tarea, usuario) {
    const QUERY =
      "SELECT titulo, descripcion FROM tarea WHERE id_tra=? AND id_uso=?";
    const [result] = await pool.query(QUERY, [tarea.id, usuario.id]);
    return result;
  }

  static async modificarTarea(tarea, usuario) {
    if (!tarea || !tarea.id || !usuario) {
      throw new Error("Datos de tarea o usuario inválidos");
    }
    if (tarea.estaActivo!==undefined) {
      let query = `
            UPDATE tarea 
            SET estaActivo = 0 
            WHERE id_tra = ? AND id_uso = ? AND estaActivo = 1
        `;

      let [result] = await pool.query(query, [tarea.id, usuario.id]);
      return result;
    }

    const campos = [];
    const valores = [];

    if (tarea.descripcion) {
      campos.push("descripcion = ?");
      valores.push(tarea.descripcion);
    }

    if (tarea.titulo) {
      campos.push("titulo = ?");
      valores.push(tarea.titulo);
    }

    if (campos.length === 0) {
      throw new Error("No se proporcionaron campos válidos para actualizar");
    }

    const query = `
        UPDATE tarea 
        SET ${campos.join(", ")} 
        WHERE id_tra = ? AND id_uso = ? AND estaActivo = 1
    `;
    const [result] = await pool.query(query, [
      ...valores,
      tarea.id,
      usuario.id,
    ]);
    return result;
  }

  static async eliminarTarea(tarea, usuario) {
    // let query = "UPDATE tarea SET estaActivo=? WHERE id_tra=? AND id_uso=?";
    // const [result] = pool.query(query, [
    //   tarea.estaActivo,
    //   tarea.id,
    //   usuario.id,
    // ]);
    let result = modelTarea.modificarTarea(tarea, usuario);
    return result;
  }
}

module.exports = modelTarea;