import express from "express";

import {
  obtenerFactura,
  obtenerFacturas,
  nuevaFactura,
  editarFactura,
  eliminarFactura,
  obtenerFacturasCliente,
} from "../controllers/facturaController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/").get(obtenerFacturas).post(nuevaFactura);

router
  .route("/:id")
  .get(obtenerFactura)
  .put(editarFactura)
  .delete(eliminarFactura);

router.route("/cliente/:id").get(obtenerFacturasCliente);

export default router;
