const { tarea_business } = require("../business");
const { tareaModel } = require("../models");

const crearTareaView = (req, res) => {
  res.render("tareas/agregar");
};

const guardarTarea = async (req, res, next) => {
  const { titulo, descripcion } = req.body;
  const { id_usuario } = req.session.user;
  const tarea = tareaModel.tareaParaGuardar(Number(id_usuario), titulo, descripcion);
  await tarea_business
    .agregarTarea(tarea)
    .then(() => res.redirect("/"))
    .catch((error) => next(error));
};

const modificarTareaView = async (req, res, next) => {
  const id_tarea = req.params.id;
  const { id_usuario } = req.session.user;
  const tarea = tareaModel.tareaParaObtener(id_tarea, id_usuario);
  await tarea_business
    .obtenerTarea(tarea)
    .then((tarea) => {
      tarea[0].id_tarea = id_tarea;
      res.render("tareas/modificar", { tarea: tarea[0] });
    })
    .catch((error) => next(error));
};

const modificarTarea = async (req, res, next) => {
  const { titulo, descripcion } = req.body;
  const ID_TAREA = Number(req.body.id);
  const ID_USUARIO = Number(req.session.user.id_usuario);
  

  let tarea = new tareaModel(ID_TAREA, ID_USUARIO, titulo, descripcion);

  if (req.body.estado !== undefined || req.body.estado !== "todos") {
    //Para modificarEstado
    const tiposEstados = {
      por_hacer: false,
      en_proceso: null,
      finalizada: true,
    };
    tarea.setEstado = tiposEstados[req.body.estado];
  }
  await tarea_business
    .modificarTarea(tarea)
    .then(res.redirect("/"))
    .catch((error) => next(error));
};

const eliminarTarea = async (req, res, next) => {
  const ID_TAREA = Number(req.params.id);
  const ID_USUARIO = Number(req.session.user.id_usuario);
  const tarea = tareaModel.tareaParaEliminar(ID_TAREA,ID_USUARIO, 0);
  await tarea_business
    .eliminarTarea(tarea)
    .then(() => res.redirect("/"))
    .catch((error) => next(error));
};

module.exports = {
  crearTareaView,
  guardarTarea,
  modificarTareaView,
  modificarTarea,
  eliminarTarea,
};
