const { tarea_business } = require("../business");

const crearTareaView = (req, res) => {
  res.render("tareas/agregar");
};

const guardarTarea = async (req, res, next) => {
  const { titulo, descripcion } = req.body;
  const { id_uso } = req.session.user;
  try {
    const tareaGuardada = await tarea_business.agregarTarea(
      { titulo, descripcion },
      { id: id_uso }
    );
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};
const modificarTareaView = async (req, res, next) => {
  const id_tra = req.params.id;
  const { id_uso } = req.session.user;
  await tarea_business
    .obtenerTarea({ id: id_tra }, { id: id_uso })
    .then((tarea) => {
      tarea[0].id_tra = id_tra;
      res.render("tareas/modificar", { tarea: tarea[0] });
    })
    .catch((error) => next(error));
};

const modificarTarea = async (req, res, next) => {
  await tarea_business
    .modificarTarea(
      {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        id: req.body.id,
      },
      { id: req.session.user.id_uso }
    )
    .then(res.redirect("/"))
    .catch((error) => next(error));
};

const eliminarTarea = async (req, res, next) => {
  await tarea_business
    .eliminarTarea(
      { id: req.params.id, estaActivo: false },
      { id: req.session.user.id_uso }
    )
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
