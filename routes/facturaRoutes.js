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
//Esquema del modelo Factura
/**
 * @swagger
 * components:
 *   schemas:
 *     Factura:
 *       type: object
 *       properties:
 *         numFacturaCobrar:
 *           type: number
 *           description: Invoice number to be charged
 *         fechaEmision:
 *           type: string
 *           format: date
 *           description: Date of invoice issuance
 *         diasCredito:
 *           type: number
 *           description: Credit days for payment (optional)
 *         fechaVencimiento:
 *           type: string
 *           format: date
 *           description: Due date of the invoice (optional)
 *         iva:
 *           type: number
 *           description: Invoice's tax value
 *         subtotal:
 *           type: number
 *           description: Subtotal amount of the invoice
 *         estado:
 *           type: boolean
 *           description: Invoice status (active/inactive)
 *         cliente:
 *           type: string
 *           description: ID of the associated client
 *       required:
 *         - numFacturaCobrar
 *         - fechaEmision
 *         - iva
 *         - subtotal
 *         - estado
 *         - cliente
 */

//Documentacion de los endpoints
/**
 * @swagger
 * tags:
 *   name: Invoice to receive
 *   description: Endpoints for managing invoices to receive

 * /api/facturas:
 *   get:
 *     summary: Get all invoices to receive
 *     tags: [Invoice to receive]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of invoices to receive
 *   post:
 *     summary: Create a new invoice to receive
 *     tags: [Invoice to receive]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Factura'
 *     responses:
 *       200:
 *         description: Invoice to receive created successfully
 *
 * /api/facturas/{id}:
 *   get:
 *     summary: Get an invoice to receive by ID
 *     tags: [Invoice to receive]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the invoice to retrieve
 *     responses:
 *       200:
 *         description: Invoice to receive retrieved successfully
 *       404:
 *         description: Invoice to receive not found
 *   put:
 *     summary: Update an existing invoice to receive
 *     tags: [Invoice to receive]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the invoice to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Factura'
 *     responses:
 *       200:
 *         description: Invoice to receive updated successfully
 *       404:
 *         description: Invoice to receive not found
 *   delete:
 *     summary: Delete an existing invoice to receive
 *     tags: [Invoice to receive]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the invoice to delete
 *     responses:
 *       200:
 *         description: Invoice to receive deleted successfully
 *       404:
 *         description: Invoice to receive not found
 *
 * /api/facturas/proveedor/{id}:
 *   get:
 *     summary: Get invoices to receive from a specific provider by ID
 *     tags: [Invoice to receive]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the provider to retrieve invoices to receive from
 *     responses:
 *       200:
 *         description: Invoices to receive from the provider retrieved successfully
 *       404:
 *         description: Provider not found or no invoices to receive available
 */

router.route("/").get(obtenerFacturas).post(nuevaFactura);

router
  .route("/:id")
  .get(obtenerFactura)
  .put(editarFactura)
  .delete(eliminarFactura);

router.route("/cliente/:id").get(obtenerFacturasCliente);

export default router;
