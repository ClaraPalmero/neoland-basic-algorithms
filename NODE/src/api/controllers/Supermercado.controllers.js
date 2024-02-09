const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Productos = require("../models/Productos.model");
const Supermercado = require("../models/Supermercado.model");

//?-----------------------------------------------------------------------------------
//!------------------------------------ CRUD -----------------------------------------
//?___________________________________________________________________________________

//?---- 1. CREATE ------ POST --------------------------------------------------------------

const createSupermercado = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await Supermercado.syncIndexes();

    const supermercadoExist = await Supermercado.findOne({
      name: req.body.name,
    });
    if (!supermercadoExist) {
      const newSupermercado = new Supermercado({
        ...req.body,
        image: catchImg,
      });

      try {
        const supermercadoSave = await newSupermercado.save();

        if (supermercadoSave) {
          return res.status(200).json({
            supermercado: supermercadoSave,
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

//?---- 2. ADD or DELETE -------------------------------------------------------------------

// aqui metemos los PRODUCTOS en el array del modelo de SUPERMERCADO
const toggleProductos = async (req, res, next) => {
  try {
    const { id } = req.params; // param es cuando está en la ruta / este id es el id del supermercado que queremos actualizar
    const { productos } = req.body; // por el body recibimos todso los id -----> id de los productos enviaremos esto por el req.body "12412242253,12535222232,12523266346"
    //!  Buscamos el supermercado por id para saber si existe
    const supermercadoById = await Supermercado.findById(id);

    //!  vamos a hacer un condicional para ver si existe y entonces hacer la update, sino mandamos un 404
    if (supermercadoById) {
      // cogemos el string que traemos del body y lo convertimos en un array separando las posiciones donde en el string habia una coma se hace mediante el metodo del split       */
      const arrayIdProductos = productos.split(",");

      /** recorremos este array que hemos creado y vemos si tenemos que:
       * 1) ----> sacar el producto si ya lo tenemos en el back
       * 2) ----> meterlo en caso de que no lo tengamos metido en el back
       */
      Promise.all(
        // 2 asincronias: 1. con Supermercado, 2. con Productos
        arrayIdProductos.map(async (productos, index) => {
          if (supermercadoById.productos.includes(productos)) {
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
            dataUpdate: await Supermercado.findById(id).populate("productos"), // mandamos un 200 con el supermercado actualizado
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

//! ---------------------------------------------------------------------
//? ------------------------------get by id -----------------------------
//? -------------------devuelves un elemento por el id-------------------
//! ---------------------------------------------------------------------
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supermercadoById = await Supermercado.findById(id);
    if (supermercadoById) {
      return res.status(200).json(supermercadoById);
    } else {
      return res.status(404).json("no se ha encontrado el supermercado");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};
//! ---------------------------------------------------------------------
//? -------------------------------get all ------------------------------
//! ---------------------------------------------------------------------

const getAll = async (req, res, next) => {
  try {
    const allSupermercado = await Supermercado.find().populate("productos"); // el find nos devuelve un array
    if (allSupermercado.length > 0) {
      return res.status(200).json(allSupermercado);
    } else {
      return res.status(404).json("no se han encontrado supermercados");
    }
  } catch (error) {
    return res.status(404).json({
      error: "error al buscar - lanzado en el catch",
      message: error.message,
    });
  }
};

//! ---------------------------------------------------------------------
//? -------------------------------get by name --------------------------
//! ---------------------------------------------------------------------
const getByName = async (req, res, next) => {
  try {
    const { name } = req.params;

    const supermercadoByName = await Supermercado.find({ name }); // nos devuelve un array de elementos
    if (supermercadoByName.length > 0) {
      return res.status(200).json(supermercadoByName);
    } else {
      return res.status(404).json("no se ha encontrado");
    }
  } catch (error) {
    return res.status(404).json({
      error: "error al buscar por nombre capturado en el catch",
      message: error.message,
    });
  }
};

//! ---------------------------------------------------------------------
//? -------------------------------UPDATE -------------------------------
//! ---------------------------------------------------------------------

const updateSupermercado = async (req, res, next) => {
  await Supermercado.syncIndexes();
  let catchImg = req.file?.path;
  try {
    const { id } = req.params;
    const supermercadoById = await Supermercado.findById(id);
    if (supermercadoById) {
      const oldImg = supermercadoById.image;

      const customBody = {
        _id: supermercadoById._id,
        image: req.file?.path ? catchImg : oldImg,
        name: req.body?.name ? req.body?.name : supermercadoById.name,
      };

      if (req.body?.type) {
        const resultEnum = enumType(req.body?.type);
        customBody.type = resultEnum.check
          ? req.body?.type
          : supermercadoById.type;
      }

      try {
        await Supermercado.findByIdAndUpdate(id, customBody);
        if (req.file?.path) {
          deleteImgCloudinary(oldImg);
        }

        //** ------------------------------------------------------------------- */
        //** VAMOS A TESTEAR EN TIEMPO REAL QUE ESTO SE HAYA HECHO CORRECTAMENTE */
        //** ------------------------------------------------------------------- */

        // ......> VAMOS A BUSCAR EL ELEMENTO ACTUALIZADO POR ID

        const supermercadoByIdUpdate = await Supermercado.findById(id);

        // ......> me cojer el req.body y vamos a sacarle las claves para saber que elementos nos ha dicho de actualizar
        const elementUpdate = Object.keys(req.body);

        /** vamos a hacer un objeto vacion donde meteremos los test */

        let test = {};

        /** vamos a recorrer las claves del body y vamos a crear un objeto con los test */

        elementUpdate.forEach((item) => {
          if (req.body[item] === supermercadoByIdUpdate[item]) {
            test[item] = true;
          } else {
            test[item] = false;
          }
        });

        if (catchImg) {
          supermercadoByIdUpdate.image === catchImg
            ? (test = { ...test, file: true })
            : (test = { ...test, file: false });
        }

        /** vamos a ver que no haya ningun false. Si hay un false lanzamos un 404,
         * si no hay ningun false entonces lanzamos un 200 porque todo esta correcte
         */

        let acc = 0;
        for (clave in test) {
          test[clave] == false && acc++;
        }

        if (acc > 0) {
          return res.status(404).json({
            dataTest: test,
            update: false,
          });
        } else {
          return res.status(200).json({
            dataTest: test,
            update: true,
          });
        }
      } catch (error) {}
    } else {
      return res.status(404).json("este supermercado no existe");
    }
  } catch (error) {
    return res.status(404).json(error);
  }
};

//! ---------------------------------------------------------------------
//? -------------------------------DELETE -------------------------------
//! ---------------------------------------------------------------------

const deleteSupermercado = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Supermercado = await Supermercado.findByIdAndDelete(id); // has enviado una respuesta a la petición que te he hecho del supermercado?
    if (Supermercado) {
      // lo buscamos para ver si sigue existiendo o no / TESTING
      const findByIdSupermercado = await Supermercado.findById(id);

      try {
        // lo actualizamos tb en productos y luego en users
        const test = await Productos.updateMany(
          // actualiza varios productos
          { supermercado: id }, //busca en super por id, cuando encuentres el super con el id determinado lo sacas, el id del super lo sacamos obtenemos por el params
          { $pull: { supermercado: id } } // lo sacas de supermercados
        );
        console.log(test);

        try {
          await User.updateMany(
            { supermercadoFav: id },
            { $pull: { supermercadoFav: id } }
          );

          return res.status(findByIdSupermercado ? 404 : 200).json({
            // si existe es que no lo ha borrado
            deleteTest: findByIdSupermercado ? false : true,
          });
        } catch (error) {
          // sacamos la respuesta al update many
          return res.status(404).json({
            error: "error catch update User",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "error catch update supermercado",
          message: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = {
  createSupermercado,
  toggleProductos,
  getAll,
  getById,
  getByName,
  updateSupermercado,
  deleteSupermercado,
};
