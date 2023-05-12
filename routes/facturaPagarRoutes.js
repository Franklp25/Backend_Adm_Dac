import express from "express";

import {
    nuevaFacturaPagar,
    obtenerFacturasPagar,
    obtenerFacturaPagar,
    obtenerFacturaPagarProveedor,
    editarFactura,
    eliminarFacturaPagar,
} from "../controllers/facturaPagarController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/").get(obtenerFacturasPagar).post(nuevaFacturaPagar);

router
  .route("/:id")
  .get(obtenerFacturaPagar)
  .put(editarFactura)
  .delete(eliminarFacturaPagar);

router.route("/proveedor/:id").get(obtenerFacturaPagarProveedor);

export default router;
