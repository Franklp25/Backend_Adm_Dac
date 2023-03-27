import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    categoría: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Creación del modelo de productos a partir del esquema
const Producto = mongoose.model("Productos", productSchema);

// Exportación del modelo
module.exports = Producto;
