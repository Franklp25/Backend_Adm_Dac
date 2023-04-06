import express from "express";

import {
    nuevoProducto,
    obtenerProducto,
    obtenerProductos,
    editarProducto,
    eliminarProducto,
} from "../controllers/productoController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/").get(obtenerProductos).post(nuevoProducto);

router
    .route("/:id")
    .get(obtenerProducto)
    .put(editarProducto)
    .delete(eliminarProducto);

export default router;