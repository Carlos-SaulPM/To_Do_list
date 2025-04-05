const express = require("express");
const router = express.Router();

const { tarea_controller } = require("../controllers");

router.get("/crear", tarea_controller.crearTareaView);
router.post("/guardar", tarea_controller.guardarTarea);
router.get("/modificar/:id", tarea_controller.modificarTareaView);
router.post("/modificar", tarea_controller.modificarTarea);
router.get("/eliminar/:id", tarea_controller.eliminarTarea);


module.exports = router;