const bcrypt = require("bcrypt"); // para encryptar informacion
const validator = require("validator"); /// nos sirve para validad info
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  // vamos a tener la definicion de datos
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: [validator.isEmail, "Email not valid"], // en caso de no ser un email valido
      // lanza el error ----> 'Email not valid' // tipo email
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate: [validator.isStrongPassword], //minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
    }, // en npmjs.com (base de datos de librerías) donde encontramos npm para instalar,...
    gender: {
      type: String,
      enum: ["hombre", "mujer", "otros"],
      required: true,
    },
    rol: {
      type: String,
      enum: ["admin", "user", "superadmin"],
      default: "user", // en caso de que no esté definido lanzará user
    },
    confirmationCode: {
      type: Number,
      required: true,
    },
    check: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String, // pq en back solo subimos texto, subo una url de la imagen que está en cloudinary.
    },
    /// cuando relacionamos un modelo con otro lo hacemos con populate y el ref a otro modelo
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  // presave, hace un preguardado, antes de subirlo a la base de datos tenemos que encriptarlo
  try {
    this.password = await bcrypt.hash(this.password, 10); // lo hasheamos, lo encripto y doy una vuelta 10 veces, se encripta 10 veces. No más que se peta  la web
    next(); // le decimos a la api que continue, es un middleware de express
    // el next puede lanzar errores al log o puede decir que continuemos (log = console.log)
  } catch (error) {
    next("Error hashing password", error);
  }
});
// de este esquema hay que crear un modelo (nombre del modelo en mayusculas)
const User = mongoose.model("User", UserSchema);
// hago una exportación
module.exports = User; // quien consume los modelos de datos? Los controladores.
