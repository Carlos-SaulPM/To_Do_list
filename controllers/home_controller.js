const { tarea_business } = require("../business");


const homeView = async (req, res) => {
  const { limite = 10, pagina = 1, q: textoBusqueda, estado } = req.query;

  let tareas;
  if (textoBusqueda) {
    tareas = await tarea_business.buscarTareas(
      { id: req.session.user.id_uso },
      textoBusqueda,
      parseInt(limite),
      pagina
    );
  } else {
    tareas = await tarea_business.obtenerTareas(
      { id: req.session.user.id_uso },
      parseInt(limite),
      pagina
    );
  }

  res.render("home", {
    tareas,
    textoBusqueda: textoBusqueda || "",
    limite: parseInt(limite),
    pagina: parseInt(pagina),
    estado: estado || "todos",
  });
};

module.exports = {homeView}