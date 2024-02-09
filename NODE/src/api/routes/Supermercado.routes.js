const { upload } = require("../../middleware/files.middleware");
const {
  createSupermercado,
  toggleProductos,
  getAll,
  getById,
  getByName,
  updateSupermercado,
  deleteSupermercado,
} = require("../controllers/Supermercado.controllers");

const SupermercadoRoutes = require("express").Router(); // nos traemos express y la parte del router
// y nos exportamos este objeto
SupermercadoRoutes.post("/create", upload.single("image"), createSupermercado);
SupermercadoRoutes.patch("/add/:id", toggleProductos);
SupermercadoRoutes.get("/:id", getById);
SupermercadoRoutes.get("/byName/:name", getByName);
SupermercadoRoutes.get("/", getAll);
SupermercadoRoutes.patch("/:id", upload.single("image"), updateSupermercado);
SupermercadoRoutes.delete("/:id", deleteSupermercado);

module.exports = SupermercadoRoutes;
//configuramos las rutas especificas en el index
