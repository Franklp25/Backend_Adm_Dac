import express from "express";

import {
    nuevoCliente,
    obtenerCliente,
    obtenerClientes,
    editarCliente,
    eliminarCliente,
} from "../controllers/clienteController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/").get(obtenerClientes).post(nuevoCliente);

router
    .route("/:id")
    .get(obtenerCliente)
    .put(editarCliente)
    .delete(eliminarCliente);

export default router;
