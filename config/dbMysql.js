const mysql = require("mysql2/promise");

const config = {
  host: "localhost",
  user: "root",
  password: "110403",
  database: "dbTareas",
  port: 3306,
};


const conexion = mysql
  .createConnection(config)
  .then((conn) => {
    console.log("✅ Conexión a MySQL lista");
    return conn;
  })
  .catch((err) => {
    console.error("❌ Error al conectar:", err);
    throw err; 
  });

module.exports = conexion;
