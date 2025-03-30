const { conexion } = require("../config");


class modelUsuario {
  static async crearNuevoUsuario(usuario) {
    const con = await conexion; 
    usuario = {
      nombre: "Carlos",
      apellidoPaterno: "Paz",
      apellidoMaterno: "Maldonado",
      fechaNacimiento: new Date(),

    }
    const [result] = await con.query(`
      INSERT INTO usuario 
      (nombre, apellido_paterno, apellido_materno, fecha_nacimiento) 
      VALUES (?, ?, ?, ?)
    `, [
      usuario.nombre,
      usuario.apellidoPaterno,
      usuario.apellidoMaterno,
      usuario.fechaNacimiento
    ]);

    console.log("✅ Usuario creado:", result);
    return result;
  }
}

module.exports = modelUsuario;