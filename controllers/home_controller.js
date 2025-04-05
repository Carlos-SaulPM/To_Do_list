const { tarea_business } = require("../business");


const homeView = async (req, res) => {
  const {
    limite = 10,
    pagina = 1,
    q: textoBusqueda,
    estado = "todos",
  } = req.query;

  const opciones = {
    estado,
    limit: parseInt(limite),
    offset: (parseInt(pagina) - 1) * parseInt(limite),
  };

  let tareas;

  if (textoBusqueda) {
    tareas = await tarea_business.buscarTareas(
      { id: req.session.user.id_uso },
      textoBusqueda,
      opciones
    );
  } else {
    tareas = await tarea_business.obtenerTareas(
      { id: req.session.user.id_uso },
      opciones
    );
  }

  res.render("home", {
    tareas,
    textoBusqueda: textoBusqueda || "",
    limite: parseInt(limite),
    pagina: parseInt(pagina),
    estado,
  });
};


module.exports = {homeView}