const express = require("express");
const router = express.Router();

const { home_controller } = require("../controllers");
const { sesionActiva_middleware } = require("../middleware");

router.get("/", sesionActiva_middleware, home_controller.homeView);


module.exports = router;