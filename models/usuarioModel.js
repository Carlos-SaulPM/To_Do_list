const { pool } = require("../config");

class modelUsuario {
  static async crearNuevoUsuario(usuario) {
    const [result] = await pool.query(
      `
      INSERT INTO usuario 
      (nombre, apellido_paterno, apellido_materno, fecha_nacimiento, correo, password) 
      VALUES (?,?,?,?,?,?)
    `,
      [
        usuario.nombre,
        usuario.apellidoPaterno,
        usuario.apellidoMaterno,
        usuario.fechaNacimiento,
        usuario.correo,
        usuario.password,
      ]
    );

    //console.log("✅ Usuario creado:", result);
    return result;
  }
  static async obtenerUsuario(datosUsuario) {
    const [registro, info] = await pool.query(
      `
      SELECT * FROM usuario WHERE correo=?
    `,
      [datosUsuario.correo]
    );
    //console.log("✅ Usuario obtenido:", registro);
    return registro;
  }

  static async obtenerContrasena(usuario) {
    const [registro, info] = await pool.query(
      `
      SELECT password FROM usuario WHERE correo=?
    `,
      [usuario.correo]
    );
    //console.log("✅ Password obtenida:", registro);
    return registro;
  }
}

module.exports = modelUsuario;
