import express from "express";

import {
  obtenerFactura,
  obtenerFacturas,
  nuevaFactura,
  editarFactura,
  eliminarFactura,
} from "../controllers/facturaController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/").get(checkAuth, obtenerFacturas).post(checkAuth, nuevaFactura);

router
  .route("/:id")
  .get(checkAuth, obtenerFactura)
  .put(checkAuth, editarFactura)
  .delete(checkAuth, eliminarFactura);

export default router;
