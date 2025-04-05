const sesionActiva = (req, res, next) => {
  if (!res.locals.user) return res.redirect("/login");
  next();
}

module.exports = sesionActiva;