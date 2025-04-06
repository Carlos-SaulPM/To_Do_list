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

const homeView = async (req, res) => {
  const {
    limite = 10,
    pagina = 1,
    textoBusqueda = "",
    estado: estadoRaw = "todos",
  } = req.query;

  // Validar que pagina sea un número válido y mayor o igual a 1
  const paginaValida = Math.max(parseInt(pagina), 1); // Asegura que la página nunca sea menor que 1

  const estado = mapearEstado(estadoRaw);

  const opciones = {
    estado,
    textoBusqueda,
    limit: parseInt(limite),
    offset: (paginaValida - 1) * parseInt(limite), // Usar la página válida aquí
  };

  const usuario = { id: req.session.user.id_uso };

  const tareas = await tarea_business.listarTareas(usuario, opciones);

  res.render("home", {
    tareas,
    textoBusqueda,
    limite: parseInt(limite),
    pagina: paginaValida, // Asegurarse de que la página mostrada sea válida
    estado: estadoRaw,
  });
};


module.exports = { homeView };
