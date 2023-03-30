import express from "express";

import {
    agregarDetalle,
    obtenerDetalle,
    actualizarDetalle,
    eliminarDetalle,
} from "../controllers/detalleFacturaController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/",checkAuth,agregarDetalle)

router
.route("/:id")
.get(checkAuth,obtenerDetalle)
.put(checkAuth,actualizarDetalle)
.delete(checkAuth,eliminarDetalle);

export default router;