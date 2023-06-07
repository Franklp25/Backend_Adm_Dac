import express from "express";

import {
    agregarDetalle,
    obtenerDetalle,
    actualizarDetalle,
    eliminarDetalle,
    obtenerEstadisticas,
    obtenerDetallesFacturas,
} from "../controllers/detalleFacturaController.js";

import checkAuth from "../middleware/checkAuth.js";
import DetalleFactura from "../models/DetalleFactura.js";

const router = express.Router();

router.post("/",agregarDetalle)

router
.route("/:id")
.get(obtenerDetalle)
.put(actualizarDetalle)
.delete(eliminarDetalle);

/* router 
.route("/")
.get(obtenerDetallesFacturas) */

 router 
.route("/")
.get(obtenerEstadisticas) 

export default router;