import express from "express";
import {
    nuevoProveedor,
    obtenerProveedores,
    obtenerProveedor,
    editarProveedor,
    eliminarProveedor,
} from "../controllers/proveedorController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/").get(obtenerProveedores).post(nuevoProveedor);

router
    .route("/:id")
    .get(obtenerProveedor)
    .put(editarProveedor)
    .delete(eliminarProveedor);

export default router;
