const { upload } = require("../../middleware/files.middleware");
const {
  createSupermercado,
  toggleProductos,
} = require("../controllers/Supermercado.controllers");

const SupermercadoRoutes = require("express").Router(); // nos traemos express y la parte del router
// y nos exportamos este objeto
SupermercadoRoutes.post("/create", upload.single("image"), createSupermercado);
SupermercadoRoutes.patch("/add/:id", toggleProductos);

module.exports = SupermercadoRoutes;
//configuramos las rutas especificas en el index
