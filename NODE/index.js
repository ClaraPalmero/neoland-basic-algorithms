//?-------------- creamos nuetro servidor web - express --------------------------

//! para llamar a las variables de retorno .env

const express = require("express");
const dotenv = require("dotenv");
const { connect } = require("./src/utils/db");

// creamos el servidor web
const app = express();

// vamos a configurar dotenv para poder utilizar las variables d entorno del .env
dotenv.config(); // siempreee

//! conectamos con la base de datos
connect();

//? --------------------- Configurar cloudinary ----------------------
const { configCloudinary } = require("./src/middleware/files.middleware");

configCloudinary(); // cuando lo añades. lo de arriba se hace automáticamente

//! ----------------- VARIABLES CONSTANTES --> PORT -------------------

const PORT = process.env.PORT;

//? ----------------------- instalamos las CORS-----------------------
const cors = require("cors");
app.use(cors());

//? ------------------ limitaciones de cantidad en el back end
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));

//! -----------------> RUTAS
const UserRoutes = require("./src/api/routes/User.routes"); // llamamos a la ruta
app.use("/api/v1/users/", UserRoutes); // exportacion de los controladores

const SupermercadoRoutes = require("./src/api/routes/Supermercado.routes");
app.use("/api/v1/supermercado/", SupermercadoRoutes);

const ProductosRoutes = require("./src/api/routes/Productos.routes");
app.use("/api/v1/productos/", ProductosRoutes); // contiene todas las rutas

//! -------------------> generamos un error de cuando no se encuentre la ruta
app.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  return next(error);
});

//! ------------------> cuando el servidor crashea metemos un 500 ----------
app.use((error, req, res) => {
  return res
    .status(error.status || 500)
    .json(error.message || "unexpected error");
});

//! ------------------ ESCUCHAMOS EN EL PUERTO EL SERVIDOR WEB-----

// esto de aqui nos revela con que tecnología esta hecho nuestro back
app.disable("x-powered-by");
app.listen(PORT, () =>
  console.log(`Server listening on port 👌🔍 http://localhost:${PORT}`)
);
