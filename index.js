const express = require("express");
const app = express();
const PORT = 3000;

require("dotenv").config();

const {usuarioModel} = require("./models")

app.get("/register", async (req, res) => {
  await usuarioModel.crearNuevoUsuario({});
  res.status(200).json({mensaje: "ok"});
})


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
})