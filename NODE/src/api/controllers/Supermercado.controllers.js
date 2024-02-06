const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Supermercado = require("../models/Supermercado.model");

const createSupermercado = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await Supermercado.syncIndexes();

    const SupermercadoExist = await Supermercado.findOne({
      name: req.body.name,
    });
    if (!SupermercadoExist) {
      const newSupermercado = new Supermercado({
        ...req.body,
        image: catchImg,
      });

      try {
        const SupermercadoSave = await newSupermercado.save();

        if (SupermercadoSave) {
          return res.status(200).json({
            Supermercado: SupermercadoSave,
          });
        } else {
          return res.status(404).json("Supermercado not saved");
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      deleteImgCloudinary(catchImg);
      return res.status(409).json("this Supermercado already exist");
    }
  } catch (error) {
    deleteImgCloudinary(catchImg);
    return next(error);
  }
};

module.exports = { createSupermercado };
