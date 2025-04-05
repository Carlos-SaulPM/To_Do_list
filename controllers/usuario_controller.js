const { usuario_business, tarea_business } = require("../business");

//Mostrar vista
const crearUsuarioView = async (req, res) => {
  res.render("usuarios/register");
};

//Guardar usuario
const guardarNuevoUsuario = async (req, res) => {
  // console.log(req.body);
  const datosUsuario = {
    nombre: req.body.nombre,
    apellidoPaterno: req.body.apellidoPaterno,
    apellidoMaterno: req.body.apellidoMaterno,
    fechaNacimiento: new Date(req.body.fechaNacimiento),
    correo: req.body.correo,
    password: req.body.password,
  };
  await usuario_business.crearNuevoUsuario(datosUsuario);
  res.redirect("/login");
};

//Vista login
const iniciarSesionView = async (req, res) => {
  res.render("usuarios/login");
};

//Login
const iniciarSesion = async (req, res) => {
  const { correo, password } = req.body;
  let existeUsuario = await usuario_business.obtenerUsuario({ correo });
  if (!existeUsuario)
    return res.render("usuarios/login", {
      mensajeError: "Credenciales no validas",
    });
  let coincidenPasswords = await usuario_business.compararPassword({
    correo,
    password,
  });
  if (!coincidenPasswords)
    return res.render("usuarios/login", {
      mensajeError: "Credenciales no validas",
    });
  req.session.user = existeUsuario[0];
  res.redirect("/");
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
}
//Vista login
const homeView = async (req, res) => {
  const { limite = 10, pagina = 1 } = req.query;
  const tareas = await tarea_business.obtenerTareas({ id: req.session.user.id_uso }, limite, pagina)
  //console.log("TAREAS: ",tareas);
  res.render("home", {tareas});
};


module.exports = {
  crearUsuarioView,
  guardarNuevoUsuario,
  iniciarSesionView,
  iniciarSesion,
  homeView,
  logout
};
