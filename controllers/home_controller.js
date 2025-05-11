const { tarea_business } = require("../business");

const mapearEstado = (estado) => {
  switch (estado) {
    case "por_hacer":
      return 0;
    case "en_proceso":
      return null;
    case "finalizada":
      return 1;
    default:
      return "todos";
  }
};

const homeView = async (req, res, next) => {
  const {
    limite = 10,
    pagina = 1,
    textoBusqueda = "",
    estado: estadoRaw = "todos",
  } = req.query;

  const paginaValida = Math.max(parseInt(pagina), 1);

  const estado = mapearEstado(estadoRaw);
  const opciones = {
    estado,
    textoBusqueda,
    limit: parseInt(limite),
    offset: (paginaValida - 1) * parseInt(limite),
  };

  const usuario = { id: req.session.user.id_usuario };

  await tarea_business
    .listarTareas(usuario, opciones)
    .then((tareas) => {
      res.render("home", {
        tareas,
        textoBusqueda,
        limite: parseInt(limite),
        pagina: paginaValida,
        estado: estadoRaw,
      });
    })
    .catch((error) => next(error));
};

module.exports = { homeView };
