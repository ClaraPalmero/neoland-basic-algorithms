//traemos las librerias necesarias

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");
dotenv.config();

//Creamos el almacen, guarda el cloudinary en storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ejercicioSeis",
    allowedFormats: ["jpg", "png", "jpeg", "gif", "svg", "webp"], // ponemos los que necesitamos
  },
});

//Creamos la función de subir imagenes
const upload = multer({ storage }); // multer --> gestion de archivos

//Función de borrado de imagenes
const deleteImgCloudinary = (imgUrl) => {
  const imgSplited = imgUrl.split("/");
  const nameSplited = imgSplited[imgSplited.length - 1].split(".");
  const folderSplited = imgSplited[imgSplited.length - 2];
  const public_id = `${folderSplited}/${nameSplited[0]}`;

  cloudinary.uploader.destroy(public_id, () => {
    console.log("Image delete in cloudinary");
  });
};

// configura el cloudinary
const configCloudinary = () => {
  cloudinary.config({
    // cloudinay ---> getting started, copiar abajo
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // viene del .env, por lo tanto necesitamos instalar el 'dotenv'
    api_secret: process.env.CLOUDINARY_API_SECRET,
    api_key: process.env.CLOUDINARY_API_KEY,
  });
};

module.exports = { upload, deleteImgCloudinary, configCloudinary };
