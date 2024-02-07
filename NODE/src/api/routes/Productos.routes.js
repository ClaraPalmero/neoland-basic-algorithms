const { upload } = require("../../middleware/files.middleware");
const {
  createProductos,
  toggleSupermercado,
} = require("../controllers/Productos.controllers");
const express = require("express"); // importamos de controllers
const ProductosRoutes = express.Router(); // importamos express y accedemos a una funcion router de expres para crear las rutas en un archivo separadp del index

// creamos la ruta
ProductosRoutes.post("/create", upload.single("image"), createProductos); // upload.single nos importa el middleware
ProductosRoutes.patch("/add/:id", toggleSupermercado);
module.exports = ProductosRoutes; // exportamos al index
