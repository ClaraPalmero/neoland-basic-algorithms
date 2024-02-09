const mongoose = require("mongoose");

const ProductosSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    type: {
      type: String,
      enum: ["alimentación", "higiene", "limpieza", "hogar"],
      required: true,
    },
    price: { type: Number, trim: true, required: true },
    image: { type: String, required: true, trim: true, unique: true },
    brand: { type: String, required: true, trim: true },
    supermercado: [{ type: mongoose.Schema.Types.ObjectId, ref: "Productos" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  },

  {
    timestamps: true,
  }
);

const Productos = mongoose.model("Productos", ProductosSchema);

module.exports = Productos;
