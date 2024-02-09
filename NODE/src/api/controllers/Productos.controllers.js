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
    const { supermercado } = req.body; // por el body recibimos todos los id -----> id de los supermercados enviaremos esto por el insomnia req.body "12412242253,12535222232,12523266346"
    //!  Buscamos el producto por id para saber si existe
    const productosById = await Productos.findById(id);

    //!  vamos a hacer un condicional para ver si existe y entonces hacer la update, sino mandamos un 404
    if (productosById) {
      // cogemos el string que traemos del body y lo convertimos en un array separando las posiciones donde en el string habia una coma se hace mediante el metodo del split       */
      const arrayIdSupermercado = supermercado.split(",");

      /** recorremos este array que hemos creado y vemos si tenemos que:
       * 1) ----> sacar el producto si ya lo tenemos en el back
       * 2) ----> meterlo en caso de que no lo tengamos metido en el back
       */
      Promise.all(
        // 2 asincronias: 1. con Supermercado, 2. con Productos
        arrayIdSupermercado.map(async (supermercado, index) => {
          if (productosById.supermercado.includes(supermercado)) {
            //!.........en caso de que incluya el producto hay que borrarlo..................

            //?______ BORRAR DEL ARRAY DE SUPERMERCADO EL PRODUCTO DENTRO LOS PRODUCTOS______

            //!..............................................................................
            try {
              await Productos.findByIdAndUpdate(id, {
                // apuntar el producto, pasar el id y decirle que tiene que sacar del array de supermercado el supermercado
                // dentro de la clave productos me vas a sacar el id del elemento que estoy recorriendo
                $pull: { supermercado: supermercado }, // query pull / sacar el id del array que estoy recorriendo
              });

              try {
                await Supermercado.findByIdAndUpdate(supermercado, {
                  // busca el id de este producto y me haces un pull del array
                  $pull: { productos: id },
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
                $push: { supermercado: supermercado },
              });
              try {
                await Supermercado.findByIdAndUpdate(supermercado, {
                  $push: { productos: id },
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
            dataUpdate: await Productos.findById(id).populate("supermercado"), // mandamos un 200 con el supermercado actualizado
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

//! ---------------------------------------------------------------------
//? -------------------------------get by id --------------------------
//! ---------------------------------------------------------------------
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productosById = await Productos.findById(id);
    if (productosById) {
      return res.status(200).json(productosById);
    } else {
      return res.status(404).json("no se ha encontrado el producto");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};
//! ---------------------------------------------------------------------
//? -------------------------------get all ------------------------------
//? -----------devuelve todos los elementos que hay en la BD-------------
//! ---------------------------------------------------------------------

const getAll = async (req, res, next) => {
  try {
    const allProductos = await Productos.find().populate("supermercado"); // el find nos devuelve un array
    if (allProductos.length > 0) {
      return res.status(200).json(allProductos);
    } else {
      return res.status(404).json("no se han encontrado productos");
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
    const productosByName = await Productos.find({ name }); // nos devuelve un array de elementos
    if (productosByName.length > 0) {
      return res.status(200).json(productosByName);
    } else {
      return res.status(404).json("no se ha encontrado el producto");
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

const updateProductos = async (req, res, next) => {
  await Productos.syncIndexes();
  let catchImg = req.file?.path;
  try {
    const { id } = req.params;
    const ProductosById = await Productos.findById(id);
    if (productosById) {
      const oldImg = productosById.image;

      const customBody = {
        _id: productosById._id,
        image: req.file?.path ? catchImg : oldImg,
        name: req.body?.name ? req.body?.name : productosById.name,
      };

      if (req.body?.type) {
        const resultEnum = enumType(req.body?.type);
        customBody.type = resultEnum.check
          ? req.body?.type
          : productosoById.type;
      }

      try {
        await Productos.findByIdAndUpdate(id, customBody);
        if (req.file?.path) {
          deleteImgCloudinary(oldImg);
        }

        //** ------------------------------------------------------------------- */
        //** VAMOS A TESTEAR EN TIEMPO REAL QUE ESTO SE HAYA HECHO CORRECTAMENTE */
        //** ------------------------------------------------------------------- */

        // ......> VAMOS A BUSCAR EL ELEMENTO ACTUALIZADO POR ID

        const productosByIdUpdate = await Productos.findById(id);

        // ......> me cojer el req.body y vamos a sacarle las claves para saber que elementos nos ha dicho de actualizar
        const elementUpdate = Object.keys(req.body);

        /** vamos a hacer un objeto vacion donde meteremos los test */

        let test = {};

        /** vamos a recorrer las claves del body y vamos a crear un objeto con los test */

        elementUpdate.forEach((item) => {
          if (req.body[item] === productosByIdUpdate[item]) {
            test[item] = true;
          } else {
            test[item] = false;
          }
        });

        if (catchImg) {
          productosByIdUpdate.image === catchImg
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
      return res.status(404).json("este producto no existe");
    }
  } catch (error) {
    return res.status(404).json(error);
  }
};

//! ---------------------------------------------------------------------
//? -------------------------------DELETE -------------------------------
//! ---------------------------------------------------------------------

const deleteProductos = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Productos = await Productos.findByIdAndDelete(id); // has enviado una respuesta a la petición que te he hecho del supermercado?
    if (Productos) {
      // lo buscamos para ver si sigue existiendo o no / TESTING
      const findByIdProductos = await Productos.findById(id);

      try {
        // lo actualizamos tb en supermercados y luego en users
        const test = await Supermercado.updateMany(
          // actualiza varios supermercados
          { productos: id }, //busca en super por id, cuando encuentres el super con el id determinado lo sacas, el id del super lo sacamos obtenemos por el params
          { $pull: { productos: id } } // lo sacas de productos
        );
        console.log(test);

        try {
          await User.updateMany(
            { productosFav: id },
            { $pull: { productosFav: id } }
          );

          return res.status(findByIdProductos ? 404 : 200).json({
            // si existe es que no lo ha borrado
            deleteTest: findByIdProductos ? false : true,
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
          error: "error catch update producto",
          message: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = {
  createProductos,
  toggleSupermercado,
  getAll,
  getById,
  getByName,
  updateProductos,
  deleteProductos,
};
