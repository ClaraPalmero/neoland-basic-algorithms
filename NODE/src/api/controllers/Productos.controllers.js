const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Productos = require("../models/Productos.model");

const createProductos = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await Productos.syncIndexes();

    const productosExist = await Productos.findOne({ name: req.body.name });
    if (!productosExist) {
      const newProductos = new Productos({ ...req.body, image: catchImg });

      try {
        const productosSave = await newProductos.save();

        if (productosSave) {
          return res.status(200).json({
            productos: productosSave,
          });
        } else {
          return res.status(404).json("productos not saved");
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      deleteImgCloudinary(catchImg);
      return res.status(409).json("this product already exist");
    }
  } catch (error) {
    deleteImgCloudinary(catchImg);
    return next(error);
  }
};

module.exports = { createProductos };
