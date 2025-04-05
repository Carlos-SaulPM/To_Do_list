const errorMiddleware = (error, req, res, next) => {
  console.error("Ocurrio un error", error);
  res.render("templates/error", {
    error: {
      codigo: "404",
      titulo: "Ocurrio un error",
      mensaje: "Error",
      
    }
  });
}

module.exports = errorMiddleware;