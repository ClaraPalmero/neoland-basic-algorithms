const mongoose = require("mongoose");

const SupermercadoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    location: { type: String, required: true, unique: true },
    timetable: { type: Number, trim: true },
    image: { type: String, required: true, trim: true, unique: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Productos" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },

  { timestamps: true }
);

const Supermercado = mongoose.model("Supermercado", SupermercadoSchema);

module.exports = Supermercado;
