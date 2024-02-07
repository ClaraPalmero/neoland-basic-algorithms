const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Productos = require("../models/Productos.model");
const Supermercado = require("../models/Supermercado.model");

const createProductos = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await Productos.syncIndexes();

    const productosExist = await Productos.findOne({ name: req.body.name });
    if (!productosExist) {
      const newProductos = new Productos({ ...req.body, image: catchImg });

      try {
        const productosSave = await newProductos.save();
        // evaluamos si está guardado o no
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

//?---- ADD or DELETE -------------------------------------------------------------------
// aqui metemos los SUPERMERCADOS en el array del modelo de PRODUCTOS
const toggleSupermercado = async (req, res, next) => {
  try {
    const { id } = req.params; // param es cuando está en la ruta / este id es el id del producto que queremos actualizar
    const { Supermercado } = req.body; // por el body recibimos todos los id -----> id de los supermercados enviaremos esto por el insomnia req.body "12412242253,12535222232,12523266346"
    //!  Buscamos el producto por id para saber si existe
    const ProductosById = await Productos.findById(id);

    //!  vamos a hacer un condicional para ver si existe y entonces hacer la update, sino mandamos un 404
    if (ProductosById) {
      // cogemos el string que traemos del body y lo convertimos en un array separando las posiciones donde en el string habia una coma se hace mediante el metodo del split       */
      const arrayIdSupermercado = Supermercado.split(",");

      /** recorremos este array que hemos creado y vemos si tenemos que:
       * 1) ----> sacar el producto si ya lo tenemos en el back
       * 2) ----> meterlo en caso de que no lo tengamos metido en el back
       */
      Promise.all(
        // 2 asincronias: 1. con Supermercado, 2. con Productos
        arrayIdSupermercado.map(async (supermercado, index) => {
          if (ProductosById.Supermercado.includes(Supermercado)) {
            //!.........en caso de que incluya el producto hay que borrarlo..................

            //?______ BORRAR DEL ARRAY DE SUPERMERCADO EL PRODUCTO DENTRO LOS PRODUCTOS______

            //!..............................................................................
            try {
              await Productos.findByIdAndUpdate(id, {
                // apuntar el producto, pasar el id y decirle que tiene que sacar del array de supermercado el supermercado
                // dentro de la clave productos me vas a sacar el id del elemento que estoy recorriendo
                $pull: { Supermercado: Supermercado }, // query pull / sacar el id del array que estoy recorriendo
              });

              try {
                await Supermercado.findByIdAndUpdate(Supermercado, {
                  // busca el id de este producto y me haces un pull del array
                  $pull: { Productos: id },
                });
              } catch (error) {
                res.status(404).json({
                  error: "error update supermercado",
                  message: error.message,
                }) && next(error);
              }
            } catch (error) {
              res.status(404).json({
                error: "error update productos",
                message: error.message,
              }) && next(error);
            }
          } else {
            //!..............................................................................
            //?________ METER EL PRODUCTO EN EL ARRAY DE PRODUCTOS DEL SUPERMERCADO_____________
            //!..............................................................................
            // si no lo incluye lo tenemos que meter ---> $push <--- mete el id en la BD

            try {
              await Productos.findByIdAndUpdate(id, {
                $push: { Supermercado: Supermercado },
              });
              try {
                await Supermercado.findByIdAndUpdate(Supermercado, {
                  $push: { Productos: id },
                });
              } catch (error) {
                res.status(404).json({
                  error: "error update Supermercado",
                  message: error.message,
                }) && next(error);
              }
            } catch (error) {
              res.status(404).json({
                error: "error update productos",
                message: error.message,
              }) && next(error);
            }
          }
        })
      )
        .catch((error) => res.status(404).json(error.message)) // este .catch captura el error en promesas
        .then(async () => {
          return res.status(200).json({
            dataUpdate: await Productos.findById(id).populate("Supermercado"), // mandamos un 200 con el supermercado actualizado
            //* populate: para que me saque la info de los ids
          });
        });
    } else {
      return res.status(404).json("este producto no existe");
    }
  } catch (error) {
    return (
      res.status(404).json({
        error: "error catch",
        message: error.message,
      }) && next(error)
    );
  }
};

module.exports = { createProductos, toggleSupermercado };
