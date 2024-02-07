const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Productos = require("../models/Productos.model");
const Supermercado = require("../models/Supermercado.model");

//?-----------------------------------------------------------------------------------
//!------------------------------------ CRUD -----------------------------------------
//?___________________________________________________________________________________

//?---- CREATE ------ POST --------------------------------------------------------------

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

//?---- ADD or DELETE -------------------------------------------------------------------
// aqui metemos los PRODUCTOS en el array del modelo de SUPERMERCADO
const toggleProductos = async (req, res, next) => {
  try {
    const { id } = req.params; // param es cuando está en la ruta / este id es el id del supermercado que queremos actualizar
    const { productos } = req.body; // por el body recibimos todso los id -----> id de los productos enviaremos esto por el req.body "12412242253,12535222232,12523266346"
    //!  Buscamos el supermercado por id para saber si existe
    const SupermercadoById = await Supermercado.findById(id);

    //!  vamos a hacer un condicional para ver si existe y entonces hacer la update, sino mandamos un 404
    if (SupermercadoById) {
      // cogemos el string que traemos del body y lo convertimos en un array separando las posiciones donde en el string habia una coma se hace mediante el metodo del split       */
      const arrayIdProductos = Productos.split(",");

      /** recorremos este array que hemos creado y vemos si tenemos que:
       * 1) ----> sacar el producto si ya lo tenemos en el back
       * 2) ----> meterlo en caso de que no lo tengamos metido en el back
       */
      Promise.all(
        // 2 asincronias: 1. con Supermercado, 2. con Productos
        arrayIdProductos.map(async (productos, index) => {
          if (SupermercadoById.productos.includes(productos)) {
            //!.........en caso de que incluya el producto hay que borrarlo............................
            //?___ BORRAR LA RELACIÓN, DEL ARRAY DE PRODUCTOS EL PRODUCTO DENTRO DEL SUPERMERCADO______
            //*--------------- SE "ENCIENDE Y SE APAGA"--> UNA OPCIÓN SUSTITUYE LA OTRA ---------------
            //!........................................................................................
            try {
              await Supermercado.findByIdAndUpdate(id, {
                // apuntar el super, pasar el id y decirle que tiene que sacar del array de productos el producto
                // dentro de la clave productos me vas a sacar el id del elemento que estoy recorriendo
                $pull: { productos: productos }, // query pull / sacar el id del array que estoy recorriendo
              });

              try {
                await Productos.findByIdAndUpdate(productos, {
                  // busca el id de este producto y me haces un pull del array
                  $pull: { Supermercado: id },
                });
              } catch (error) {
                res.status(404).json({
                  error: "error update producto",
                  message: error.message,
                }) && next(error);
              }
            } catch (error) {
              res.status(404).json({
                error: "error update supermercado",
                message: error.message,
              }) && next(error);
            }
          } else {
            //!..............................................................................
            //?________ METER EL PRODUCTO EN EL ARRAY DE PRODUCTOS DEL SUPERMERCADO_____________
            //!..............................................................................
            // si no lo incluye lo tenemos que meter ---> $push <--- mete el id en la BD

            try {
              await Supermercado.findByIdAndUpdate(id, {
                $push: { productos: productos },
              });
              try {
                await Productos.findByIdAndUpdate(productos, {
                  $push: { Supermercado: id },
                });
              } catch (error) {
                res.status(404).json({
                  error: "error update productos",
                  message: error.message,
                }) && next(error);
              }
            } catch (error) {
              res.status(404).json({
                error: "error update supermercado",
                message: error.message,
              }) && next(error);
            }
          }
        })
      )
        .catch((error) => res.status(404).json(error.message)) // este .catch captura el error en promesas
        .then(async () => {
          return res.status(200).json({
            dataUpdate: await Supermercado.findById(id).populate("Productos"), // mandamos un 200 con el supermercado actualizado
            //* populate: para que me saque la info de los ids
          });
        });
    } else {
      return res.status(404).json("este supermercado no existe");
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

module.exports = { createSupermercado, toggleProductos };
