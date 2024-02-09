const Productos = require("../models/Productos.model");
const Supermercado = require("../models/Supermercado.model");
const User = require("../models/User.model");
const Chat = require("../models/Chat.model");

//!------------------------------------------------------------------------------------------------
//?------------------------------- Create --- POST -----------------------------------------------
//!------------------------------------------------------------------------------------------------

const createMessage = async (req, res, next) => {
  try {
    const { owner, type, content } = req.body; // extraemos los datos del body
    const { idRecipient } = req.params; //! id de a quien quiero hacer el comentario
    // ahora buscamos en los modelos, nos los traemos
    const findUser = await User.findById(idRecipient);
    const findCharacter = await Character.findById(idRecipient);
    const findMovie = await Movie.findById(idRecipient);
    // ahora buscamos en los modelos, nos los traemos
    //buscaremos en los 3 modelos si stá el que busco, si no está ERROR
    if (findUser) {
      // tenemos qu e valorar si el comentario es privado o púbico
      /// creamos el comentario y lo guardamos
      const newMessage = new Menssage(req.body);
      const savedMessage = await newMessage.save();
      if (type == "private") {
        // TENEMOS QUE EVALUAR SI TENEMOS UN CHAT ABIERTO CON ESTOS DOS USER
        try {
          /// despues de guardarlo comprobamos exista un chat o no

          const chatExistOne = await Chat.findOne({
            userOne: req.user._id,
            userTwo: findUser._id,
          });
          const chatExistTwo = await Chat.findOne({
            userOne: findUser._id,
            userTwo: req.user._id,
          });
          console.log(chatExistOne);
          console.log(chatExistTwo);

          if (chatExistOne != null || chatExistTwo != null) {
            ///&/ existe un chat y entonces lo actualizamos conm el nuevo mensaje

            if (chatExistOne) {
              try {
                await chatExistOne.updateOne({
                  $push: { messages: newMessage._id },
                });

                return res.status(200).json({
                  chat: await Chat.findById(chatExistOne._id),
                  comment: newMessage,
                });
              } catch (error) {
                try {
                  await Menssage.findByIdAndDelete(savedMessage._id);
                  return res
                    .status(404)
                    .json(
                      "error en actualizar el chat existente, elimino el comentario"
                    );
                } catch (error) {
                  return res
                    .status(404)
                    .json(
                      "no he borrado el coment  ni tampoco he actualizdo el chat existente"
                    );
                }
              }
            } else if (chatExistTwo) {
              try {
                await chatExistTwo.updateOne({
                  $push: { messages: newMessage._id },
                });

                return res.status(200).json({
                  chat: await Chat.findById(chatExistTwo._id),
                  comment: newMessage,
                });
              } catch (error) {
                try {
                  await Menssage.findByIdAndDelete(savedMessage._id);
                  return res
                    .status(404)
                    .json(
                      "error en actualizar el chat existente, elimino el comentario"
                    );
                } catch (error) {
                  return res
                    .status(404)
                    .json(
                      "no he borrado el coment  ni tampoco he actualizdo el chat existente"
                    );
                }
              }
            }
          } else {
            console.log("entro");

            /// crear un chat con el comentario que hemos creado
            const newChat = new Chat({
              userOne: req.user._id,
              userTwo: findUser._id,
              messages: [savedMessage._id],
            });

            try {
              await newChat.save();
              return res.status(200).json({
                chat: newChat,
                comment: newMessage,
              });
            } catch (error) {
              // lo borramos porque no nos ha enviado bien el tipo
              try {
                await Menssage.findByIdAndDelete(savedMessage._id);
                return res
                  .status(404)
                  .json(
                    "no se ha guardado el nuevo chat y se ha borrado el comentario"
                  );
              } catch (error) {
                return res
                  .status(404)
                  .json(
                    "no se ha creado el chat pero no se ha borrado el comentario"
                  );
              }
            }
          }
        } catch (error) {
          return res.status(404).json(error.message);
        }
      } else if (type == "public") {
        // SIMPLEMENTE CREAMOS EL COMENTARIO Y LO METEMOS EN LOS ARRAY DE LOS MODELOS AL QUE CORRESPONDA -- USER
      } else {
        // lo borramos porque no nos ha enviado bien el tipo
        await Menssage.findByIdAndDelete(savedMessage._id);
        return res.status(404).json(error.message);
      }
    } else if (findCharacter) {
    } else if (findMovie) {
    } else {
      return res.status(404).json("el id no esta correcto");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = { createMessage };
