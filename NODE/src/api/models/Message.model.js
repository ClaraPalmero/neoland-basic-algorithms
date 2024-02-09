const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["private", "public"], required: true },
    content: { type: String, required: true },
    recipientProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Productos",
    },
    recipientSupermercado: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supermercado",
    },
    recipientUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },

  {
    timestamps: true,
  }
);
