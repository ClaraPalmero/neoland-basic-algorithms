//! --------------------------middleware------------------------------------
const { deleteImgCloudinary } = require("../../middleware/files.middleware");

//! ---------------------------- modelos ----------------------------------
const User = require("../models/User.model");

//! ---------------------------- utils ----------------------------------
const randomCode = require("../../utils/randomCode");
const sendEmail = require("../../utils/sendEmail");

//! ------------------------------librerias--------------------------------
const nodemailer = require("nodemailer");
const validator = require("validator");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const {
  setTestEmailSend,
  getTestEmailSend,
} = require("../../state/state.data");
const { generateToken } = require("../../utils/token");
const randomPassword = require("../../utils/randomPassword");

dotenv.config();

//! -----------------------------------------------------------------------------
//? ----------------------------REGISTER LARGO EN CODIGO ------------------------
//! -----------------------------------------------------------------------------
//registro mas sencillo, donde esta en la misma funcion todo el codigo

//------------------->CRUD es el acrónimo de "Crear, Leer, Actualizar y Borrar"//estamos haciendo la parte del create
//funcion asincrona porque el backend es asincrono
const registerLargo = async (req, res, next) => {
  /// lo primero que vamos hacer captura la imagen que previamente hemos subido en el middleaware
  let catchImg = req.file?.path; /// el optional chaining es para que no rompa en caso de no haber path
  // el path es la url de cloudinary ---> hacemos una llamadas al cloudinary, para ver si el usuario ha introducio o no una imagen, si no lo ha hecho para eso esta el opcional chaining

  try {
    /** hay que meter un try catch por cada asincronia de actualizacion que tengamos de actualizacion para poder
     * seleccionar los errores de forma separada e individualizada
     *
     * la asincronias de lectura no hace falta que tengan un try catch por cada una de ellas
     */

    /** sincronizamos los index de los elementos unique */
    await User.syncIndexes(); // actualización de index, esperas una respuesta del back analiza los indexes de users para ver los datos actualozados del baack
    let confirmationCode = randomCode();
    const { email, name } = req.body; // lo que enviamos por la parte del body de la request

    // vamos a buscsar al usuario
    const userExist = await User.findOne(
      //primero el modelo, quiero que me busques uno que coincida o bien en el email o en el nombre
      { email: req.body.email },
      { name: req.body.name }
    );

    if (!userExist) {
      //! -------------LO REGISTRAMOS PORQUE NO HAY COINCIDENCIAS CON UN USER INTERNO
      const newUser = new User({ ...req.body, confirmationCode }); // instanciamos y ya se nos crea un _id, lo crea mongoose con la libreria de mongo db

      // una vez hecho esto ya tenemos el _id del user

      // EL USER HA METIDO IMAGEN ???
      if (req.file) {
        newUser.image = req.file.path; //el path es el url de cloudinary que hemos subido en el middlware
      } else {
        newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
      }

      ///! SI HAY UNA NUEVA ASINCRONIA DE CREAR O ACTUALIZAR HAY QUE METER OTRO TRY CATCH
      try {
        const userSave = await newUser.save(); // el nuevo usuario que he creado lo guardo

        if (userSave) {
          // ---------------------------> ENVIAR EL CODIGO CON NODEMAILER --------------------
          const emailEnv = process.env.EMAIL; //traemos el email y el password
          const password = process.env.PASSWORD;

          const transporter = nodemailer.createTransport({
            //de la libreria de nodemoiler, nos transporta los datos del email
            service: "gmail",
            auth: {
              user: emailEnv,
              pass: password,
            },
          });

          const mailOptions = {
            from: emailEnv,
            to: email,
            subject: "Confirmation code",
            text: `tu codigo es ${confirmationCode}, gracias por confiar en nosotros ${name}`,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            // gestiona el envio, recibe las opciones del email
            if (error) {
              console.log(error);
              return res.status(404).json({
                user: userSave,
                confirmationCode: "error, resend code",
              });
            }
            console.log("Email sent: " + info.response);
            return res.status(200).json({
              user: userSave,
              confirmationCode,
            });
          });
        }
      } catch (error) {
        return res.status(404).json(error.message); // es dinamico, por eso no le damos un mensaje
      }
    } else {
      ///! -------> cuando ya existe un usuario con ese email y ese name
      if (req.file) deleteImgCloudinary(catchImg);
      // como ha habido un error la imagen previamente subida se borra de cloudinary
      return res.status(409).json("this user already exist");
    }
  } catch (error) {
    // SIEMPRE QUE HAY UN ERROR GENERAL TENEMOS QUE BORRAR LA IMAGEN QUE HA SUBIDO EL MIDDLEWARE
    if (req.file) deleteImgCloudinary(catchImg);
    return next(error);
  }
};

//! ---------------------------------------------------------------------------------------------
//? ----------------------------REGISTER CORTO EN CODIGO ------Registro global-------------------
//! ---------------------------------------------------------------------------------------------

//lo que hacemos es llamar al estado

const register = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await User.syncIndexes();
    let confirmationCode = randomCode();
    const { email, name } = req.body;

    const userExist = await User.findOne(
      { email: req.body.email },
      { name: req.body.name }
    );
    if (!userExist) {
      const newUser = new User({ ...req.body, confirmationCode });
      if (req.file) {
        newUser.image = req.file.path;
      } else {
        newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
      }

      try {
        const userSave = await newUser.save();

        if (userSave) {
          sendEmail(email, name, confirmationCode);
          setTimeout(() => {
            if (getTestEmailSend()) {
              // el estado ya utilizado lo reinicializo a false
              setTestEmailSend(false);
              return res.status(200).json({
                user: userSave,
                confirmationCode,
              });
            } else {
              setTestEmailSend(false);
              return res.status(404).json({
                user: userSave,
                confirmationCode: "error, resend code",
              });
            }
          }, 1100);
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(409).json("this user already exist");
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImg);
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------REGISTER CON REDIRECT----------------------------
//! -----------------------------------------------------------------------------
const registerWithRedirect = async (req, res, next) => {
  let catchImg = req.file?.path; // hacemos el catchImg pq los try catch tienen un scope de bloque, si lo ponemos fuera lo pudedem cojer los dos
  try {
    await User.syncIndexes();
    let confirmationCode = randomCode();
    const userExist = await User.findOne(
      { email: req.body.email },
      { name: req.body.name }
    );
    if (!userExist) {
      const newUser = new User({ ...req.body, confirmationCode });
      if (req.file) {
        newUser.image = req.file.path;
      } else {
        newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
      }

      try {
        const userSave = await newUser.save();
        const PORT = process.env.PORT;
        if (userSave) {
          return res.redirect(
            307,
            `http://localhost:${PORT}/api/v1/users/register/sendMail/${userSave._id}`
          );
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(409).json("this user already exist");
    }
  } catch (error) {
    if (req.file) {
      deleteImgCloudinary(catchImg);
    }
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? ------------------CONTRALADORES QUE PUEDEN SER REDIRECT --------------------
//! ----------------------------------------------------------------------------

//!!! esto quiere decir que o bien tienen entidad propia porque se llaman por si mismos por parte del cliente
//! o bien son llamados por redirect es decir son controladores de funciones accesorias

const sendCode = async (req, res, next) => {
  try {
    /// sacamos el param que hemos recibido por la ruta
    /// recuerda la ruta: http://localhost:${PORT}/api/v1/users/register/sendMail/${userSave._id}
    const { id } = req.params;

    /// VAMOS A BUSCAR EL USER POR ID para tener el email y el codigo de confirmacion
    const userDB = await User.findById(id);

    /// ------------------> envio el codigo
    const emailEnv = process.env.EMAIL;
    const password = process.env.PASSWORD;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailEnv,
        pass: password,
      },
    });

    const mailOptions = {
      from: emailEnv,
      to: userDB.email,
      subject: "Confirmation code",
      text: `tu codigo es ${userDB.confirmationCode}, gracias por confiar en nosotros ${userDB.name}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(404).json({
          user: userDB,
          confirmationCode: "error, resend code",
        });
      }
      console.log("Email sent: " + info.response);
      return res.status(200).json({
        user: userDB,
        confirmationCode: userDB.confirmationCode,
      });
    });
  } catch (error) {
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? -----------------------RESEND CODE -----------------------------
//! -----------------------------------------------------------------------------

const resendCode = async (req, res, next) => {
  // request, response
  try {
    //!---1--- vamos a configurar nodemailer porque tenemos que enviar un codigo
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
    });

    //!---2--- hay que comprobar que el usuario exista porque si no existe no tiene sentido hacer ninguna verificación
    const userExists = await User.findOne({ email: req.body.email }); // findOne es una query que busca. el e mail lo sacamos de req.body.email
    //? --- si existe le damos las opciones ---
    if (userExists) {
      const mailOptions = {
        from: email,
        to: req.body.email,
        subject: "Confirmation code",
        text: `tu codigo es ${userExists.confirmationCode}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        // esta callback lo que analiza son los parámetros de error e info
        if (error) {
          // evaluamos el error
          console.log(error);
          return res.status(200).json({
            // para ser correctos debemos poner un 404, pero en react puede dar error
            resend: false,
          });
        } else {
          // se ha admitido
          console.log("Email sent: " + info.response);
          return res.status(200).json({
            resend: true,
          });
        }
      });
    } else {
      return res.status(404).json("User not found"); // en caso de que no exista mandamos un 404 user not found
    }
  } catch (error) {
    // casi siempre el catch general se lanza or el next
    return next(setError(500, error.message || "Error general send code")); // lo traemos del helpers
  }
};

//! ------------------------------------------------------------------------
//? -------------------------- CHECK NEW USER------------------------------
//! ------------------------------------------------------------------------

const checkNewUser = async (req, res, next) => {
  try {
    //! nos traemos de la req.body el email y codigo de confirmation
    const { email, confirmationCode } = req.body;

    const userExists = await User.findOne({ email });

    if (!userExists) {
      //!No existe----> 404 de no se encuentra
      return res.status(404).json("User not found");
    } else {
      // cogemos que comparamos que el codigo que recibimos por la req.body y el del userExists es igual
      if (confirmationCode === userExists.confirmationCode) {
        try {
          await userExists.updateOne({ check: true });

          // hacemos un testeo de que este user se ha actualizado correctamente, hacemos un findOne
          const updateUser = await User.findOne({ email });

          // este finOne nos sirve para hacer un ternario que nos diga si la propiedad vale true o false
          return res.status(200).json({
            testCheckOk: updateUser.check == true ? true : false,
          });
        } catch (error) {
          return res.status(404).json(error.message); // mensaje que viende de mongo db
        }
      } else {
        try {
          /// En caso de equivocarse con el codigo lo borramos de la base datos y lo mandamos al registro
          await User.findByIdAndDelete(userExists._id);

          // borramos la imagen
          deleteImgCloudinary(userExists.image);

          // devolvemos un 200 y el test de ver si el delete se ha hecho correctamente, le decimos que el usuario está borrado
          return res.status(200).json({
            userExists,
            check: false,
            //* ---!--- esta manera de hacer un test son las mejores ---!--- haces un test para cada uno de los usuaios, es más potente.
            // test en el runtime sobre la eliminacion de este user
            delete: (await User.findById(userExists._id)) // buscame el usuario por -id, si lo encuentras, ha ahbido uin error en el usuario
              ? "error delete user"
              : "ok delete user", // si no lo encuentras bórralo
          });
        } catch (error) {
          return res
            .status(404)
            .json(error.message || "error general delete user");
        }
      }
    }
  } catch (error) {
    // siempre en el catch devolvemos un 500 con el error general
    return next(setError(500, error.message || "General error check code"));
  }
};

//! -----------------------------------------------------------------------------
//? --------------------------------LOGIN ---------------------------------------
//! -----------------------------------------------------------------------------

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body; // recibimos con el body el maiol y el psw
    const userDB = await User.findOne({ email });

    if (userDB) {
      // compara dos contraseñar una sin encryptar y otra que si lo esta
      if (bcrypt.compareSync(password, userDB.password)) {
        const token = generateToken(userDB._id, email);
        return res.status(200).json({
          user: userDB,
          token,
        });
      } else {
        return res.status(404).json("password don't match");
      }
    } else {
      return res.status(404).json("User no register");
    }
  } catch (error) {
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? --------------------------------AUTOLOGIN -----------------------------------
//*-- la diferencia con el login es que va a comparar 2 contraseñas encriptadas--
//! -----------------------------------------------------------------------------

const autoLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDB = await User.findOne({ email });

    if (userDB) {
      // comparo dos contraseñas encriptadas
      if (password == userDB.password) {
        const token = generateToken(userDB._id, email);
        return res.status(200).json({
          user: userDB,
          token,
        });
      } else {
        return res.status(404).json("password dont match");
      }
    } else {
      return res.status(404).json("User no register");
    }
  } catch (error) {
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? -----------------------CONTRASEÑAS Y SUS CAMBIOS-----------------------------
//! -----------------------------------------------------------------------------

//? -----------------------------------------------------------------------------
//! ------------------CAMBIO DE CONTRASEÑA CUANDO NO ESTAS LOGADO----------------
//* ----------------------------- es un redirect --------------------------------
//* -necesitamos un test, si las constraseñas son iguales---> está actualizado --
//? -----------------------------------------------------------------------------

const changePassword = async (req, res, next) => {
  try {
    // vamos a recibir  por el body el email y vamos a comprobar que este user existe en la base de datos

    const { email } = req.body;
    console.log(req.body);
    const userDb = await User.findOne({ email }); // comprobamos si existe el ususario con el email
    if (userDb) {
      /// si existe hacemos el redirect
      const PORT = process.env.PORT;
      return res.redirect(
        307,
        `http://localhost:${PORT}/api/v1/users/sendPassword/${userDb._id}`
      );
    } else {
      return res.status(404).json("User no register");
    }
  } catch (error) {
    return next(error);
  }
};

const sendPassword = async (req, res, next) => {
  try {
    // VAMOS A BUSCAR AL USER POR EL ID DEL PARAM
    const { id } = req.params;
    const userDb = await User.findById(id);
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
    });

    // genero el password y lo aoscio al email
    let passwordSecure = randomPassword(); // es otro archivo en utils
    console.log(passwordSecure);
    const mailOptions = {
      from: email,
      to: userDb.email,
      subject: "-----",
      //!----!!!--- recordar no poner la palabra contraseñ ao password en el texto o gmail lo borra -----
      text: `User: ${userDb.name}. Your new code login is ${passwordSecure} Hemos enviado esto porque tenemos una solicitud de cambio de contraseña, si no has sido ponte en contacto con nosotros, gracias.`,
    };
    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        // si hay un error mando un 404
        console.log(error);
        return res.status(404).json("dont send email and dont update user");
      } else {
        // si no hay ningún error compruebo si la contraseña que se ha actualizado la guardamos en momgo db
        console.log("Email sent: " + info.response);
        //guardamos esta contraseña en mongo db encriptada

        // ---1--- encriptamos la contraseña con hashSync de dcrypt
        const newPasswordBcrypt = bcrypt.hashSync(passwordSecure, 10);

        try {
          /** este metodo te lo busca por id y luego modifica las claves que le digas
           * en este caso le decimos que en la parte de password queremos meter la contraseña hasheada
           */
          await User.findByIdAndUpdate(id, { password: newPasswordBcrypt });

          //!----------------------- test --------------------------------------------
          // vuelvo a buscar el user pero ya actualizado
          const userUpdatePassword = await User.findById(id);

          // hago un compare sync ----> comparo una contraseña no encriptada con una encriptada
          // -----> userUpdatePassword.password ----> encriptada (la que está en el backend guardada)
          // -----> passwordSecure -----> contraseña no encriptada (la que he generado)
          if (bcrypt.compareSync(passwordSecure, userUpdatePassword.password)) {
            // si son iguales quiere decir que el back se ha actualizado correctamente
            return res.status(200).json({
              updateUser: true,
              sendPassword: true,
            });
          } else {
            // si no son iguales le diremos que hemos enviado el correo pero que no hemos actualizado el user del back en mongo db
            return res.status(404).json({
              updateUser: false, // pq no la ha actualizado
              sendPassword: true,
            });
          }
        } catch (error) {
          return res.status(404).json(error.message); // cuando es un return tengo que mandar el error.message, en cambio en el next NO
        }
      }
    });
  } catch (error) {
    return next(error);
  }
};

//? -----------------------------------------------------------------------------
//! ----------------CAMBIO DE CONTRASEÑA CUANDO YA SE ESTA ESTA LOGADO-----------
//? -----------------------------------------------------------------------------

const modifyPassword = async (req, res, next) => {
  // IMPORTANTE ---> REQ.USER ----> LO CREA LOS AUTH MIDDLEWARE
  console.log("req.user", req.user);

  try {
    const { password, newPassword } = req.body; // contraseña antigua y contraseña nueva
    const { _id } = req.user; // estamos en autenticación, buscamos en e middleware el id

    // comparamos la contraseña vieja sin encriptar y la encriptada
    if (bcrypt.compareSync(password, req.user.password)) {
      /** tenemos que encriptar la contraseña para poder guardarla en el back mongo db */
      const newPasswordHashed = bcrypt.hashSync(newPassword, 10); // encriptamos la contraseña nueva

      //* una vez encriptada vamos a actualizar la contraseña en mongo db
      try {
        await User.findByIdAndUpdate(_id, { password: newPasswordHashed });
        // una vez actualizado
        //? ---TESTING EN TIEMPO REAL---

        //?--1-- Traemos el user actualizado
        const userUpdate = await User.findById(_id);

        //?--2-- vamos a comparar la contraseña sin encriptar y la tenemos en el back que esta encriptada
        if (bcrypt.compareSync(newPassword, userUpdate.password)) {
          // si son iguales 200 ---> UPDATE OK
          return res.status(200).json({
            updateUser: true,
          });
        } else {
          ///si NO son iguales ---> 404. no son iguales
          return res.status(404).json({
            updateUser: false,
          });
        }
      } catch (error) {
        return res.status(404).json(error.message); // catcheaamos el error de la sincronia de actualización
      }
    } else {
      // si las contraseñas no son iguales le mando un 404 diciendo que las contraseñas no son iguales */
      return res.status(404).json("password dont match");
    }
  } catch (error) {
    return next(error);
    /**
     * return next(
      setError(
        500,
        error.message || 'Error general to ChangePassword with AUTH'
      )
    );
     */
  }
};

//! -----------------------------------------------------------------------------
//? ---------------------------------UPDATE--------------------------------------
//! -----------------------------------------------------------------------------

const update = async (req, res, next) => {
  // capturamos la imagen nueva subida a cloudinary (url)
  let catchImg = req.file?.path;

  try {
    // actualizamos los elementos unique del modelo (de los index ---> elementos que estan unicos en los modelos de datos, estan en mongo db tb)
    await User.syncIndexes();

    // instanciamos un nuevo objeto del modelo de user con el req.body
    const patchUser = new User(req.body);

    // si tenemos imagen metemos a la instancia del modelo esta imagen nuevo que es lo que capturamos en catchImg
    req.file && (patchUser.image = catchImg);

    // vamos a salvaguardar info que no quiero que el usuario pueda cambiarme
    //! -- aqunque me pida el usuario cambiar estas claves, NO SE LO VOY A CAMBIAR --
    patchUser._id = req.user._id;
    patchUser.password = req.user.password;
    patchUser.rol = req.user.rol;
    patchUser.confirmationCode = req.user.confirmationCode;
    patchUser.email = req.user.email;
    patchUser.check = req.user.check;

    //?--- ahora nos creamos en el utils una función que compruebe este enumOK de arriba (array)

    if (req.body?.gender) {
      // en el body me estás pasando género?
      // lo comprobamos y lo metermos en patchUser con un ternario en caso de que sea true o false el resultado de la funcion
      const resultEnum = enumOk(req.body?.gender); // si me estás pasando género, dime que ha salido de la función numOK
      patchUser.gender = resultEnum.check ? req.body?.gender : req.user.gender; // si en enumOk el check está en true me vas a meter lo que tu me estás dando por el body, si no te vas a quedar con lo que ya teníamos
    } //! siempre que tengamos un enum, tenemos que hacer una función para comprobar ese enum con una función externa
    //*--- actualización ---
    try {
      /** si hacemos una actualizacion NO HACER CON EL SAVE ---> solo cuando metemos un elemento nuevo
       * le metemos en el primer valor el id de el objeto a actualizar
       * y en el segundo valor le metemos la info que queremos actualizar
       */
      await User.findByIdAndUpdate(req.user._id, patchUser);

      // si nos ha metido una imagen nueva y ya la hemos actualizado pues tenemos que borrar la antigua
      // la antigua imagen la tenemos guardada con el usuario autenticado --> req.user
      if (req.file) deleteImgCloudinary(req.user.image); // si hay imagen, borramos

      // !--------------------- TEST RUNTIME ---------------------------------
      /** siempre lo primero cuando testeamos es el elemento actualizado para comparar la info que viene
       * del req.body */
      const updateUser = await User.findById(req.user._id); // me traigo el usuario actualizado

      //sacamos las claves del objeto del req.body para saber que info nos han pedido actualizar
      const updateKeys = Object.keys(req.body); // esto es un array

      // creamos un array donde guardamos los test
      const testUpdate = [];

      // recorremos el array de la info que con el req.body nos dijeron de actualizar
      //! recordad este array lo sacamos con el Object.keys

      // updateKeys ES UN ARRAY CON LOS NOMBRES DE LAS CLAVES = ["name", "email", "rol"]

      //*----------------> para todo lo diferente de la imagen ----------------------------------

      updateKeys.forEach((item) => {
        // vamos a comprobar que la info actualizada sea igual que lo que me mando por el body...
        if (updateUser[item] === req.body[item]) {
          // si coincide, no cambia nada
          // aparte vamos a comprobar que esta info sea diferente a lo que ya teniamos en mongo subido antes */
          if (updateUser[item] != req.user[item]) {
            // si el user es diferente a lo que ya teniamos lanzamos el nombre de la clave y su valor como true en un objeto
            // este objeto see pusea en el array que creamos arriba que guarda todos los testing en el runtime
            testUpdate.push({
              [item]: true,
            });
          } else {
            // si son igual lo que pusearemos sera el mismo objeto que arrriba pro diciendo que la info es igual
            testUpdate.push({
              [item]: "sameOldInfo", // [] cojerá el valor, el primero del array
            });
          }
        } else {
          testUpdate.push({
            [item]: false,
          });
        }
      });

      //* ---------------------- para la imagen ---------------------------------
      if (req.file) {
        // la imagen va por la req.file
        /** si la imagen del user actualizado es estrictamente igual a la imagen nueva que la
         * guardamos en el catchImg, mandamos un objeto con la clave image y su valor en true
         * en caso contrario mandamos esta clave con su valor en false
         */
        updateUser.image === catchImg
          ? testUpdate.push({
              image: true,
            })
          : testUpdate.push({
              image: false,
            });
      }

      // una vez finalizado el testing en el runtime vamos a mandar el usuario actualizado y el objeto con los test

      return res.status(200).json({
        updateUser,
        testUpdate,
      });
    } catch (error) {
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(404).json(error.message);
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImg);
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? ---------------------------------DELETE--------------------------------------
//! -----------------------------------------------------------------------------

const deleteUser = async (req, res, next) => {
  try {
    const { _id, image } = req.user;
    await User.findByIdAndDelete(_id);
    if (await User.findById(_id)) {
      // si el usuario
      return res.status(404).json("not deleted");
    } else {
      deleteImgCloudinary(image);
      return res.status(200).json("ok delete");
    }
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  registerLargo,
  register,
  sendCode,
  registerWithRedirect,
  resendCode,
  checkNewUser,
  login,
  autoLogin,
  changePassword,
  sendPassword,
  modifyPassword,
  update,
  deleteUser,
};
