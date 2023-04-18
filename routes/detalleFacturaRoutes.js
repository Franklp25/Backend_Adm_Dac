import express from "express";

import {
    agregarDetalle,
    obtenerDetalle,
    actualizarDetalle,
    eliminarDetalle,
} from "../controllers/detalleFacturaController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/",agregarDetalle)

router
.route("/:id")
.get(obtenerDetalle)
.put(actualizarDetalle)
.delete(eliminarDetalle);

export default router;