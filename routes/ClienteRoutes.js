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
/**
 * @openapi
 * /api/clientes:
 *   get:
 *     tags:
 *       - Clientes
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.route("/").get(obtenerClientes).post(nuevoCliente);

router
    .route("/:id")
    .get(obtenerCliente)
    .put(editarCliente)
    .delete(eliminarCliente);

export default router;
