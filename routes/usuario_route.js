const express = require("express");
const router = express.Router();

const { usuario_controller } = require("../controllers")
const {sesionActiva_middleware}= require("../middleware")

router.get("/register", usuario_controller.crearUsuarioView);
router.post("/register", usuario_controller.guardarNuevoUsuario)
router.get("/login", usuario_controller.iniciarSesionView);
router.get("/", sesionActiva_middleware, usuario_controller.homeView);
router.post("/login", usuario_controller.iniciarSesion);
router.get("/logout", usuario_controller.logout);

module.exports = router;