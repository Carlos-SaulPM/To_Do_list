const express = require("express");
const app = express();
const PORT = 3000;

require("dotenv").config();
const path = require("path")
const morgan = require('morgan');
const bodyparser = require('body-parser');
const session = require("express-session");

const { usuario_route, tarea_route, home_route } = require("./routes")
const { sesionActiva_middleware, error_middleware} = require("./middleware");

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(morgan("tiny"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(
  session({
    secret: "ClaveSecreta",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 300000 },
  })
);
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use("/", home_route);
app.use("/", usuario_route);
app.use("/tarea", sesionActiva_middleware,tarea_route)

app.use(error_middleware);


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
})