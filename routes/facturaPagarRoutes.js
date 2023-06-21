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

// Esquema del modelo de facturaPagar
/**
 * @swagger
 * tags:
 *   name: Invoice to pay
 *   description: Operations related to invoices to pay
 * components:
 *   schemas:
 *     FacturaPagar:
 *       type: object
 *       properties:
 *         numFacturaPagar:
 *           type: number
 *           description: Invoice number to be paid
 *         proveedor:
 *           type: string
 *           description: ID of the associated provider
 *         fechaEmision:
 *           type: string
 *           format: date
 *           description: Date of invoice issuance
 *         diasCredito:
 *           type: number
 *           description: Credit days for payment
 *         total:
 *           type: number
 *           description: Total amount of the invoice to be paid
 *         fechaVencimiento:
 *           type: string
 *           format: date
 *           description: Due date of the invoice (optional)
 *         estado:
 *           type: boolean
 *           description: Invoice payment status (paid/unpaid)
 *       required:
 *         - numFacturaPagar
 *         - proveedor
 *         - fechaEmision
 *         - diasCredito
 *         - total
 *         - estado
 */

// Documentacion de Endpoints para FacturaPagar

// GET /api/facturas-pagar
/**
 * @swagger
 * /api/facturas-pagar:
 *   get:
 *     summary: Retrieve all invoices to pay
 *     tags: [Invoice to pay]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of invoices to pay
 */

// POST /api/facturas-pagar
/**
 * @swagger
 * /api/facturas-pagar:
 *   post:
 *     summary: Create a new invoice to pay
 *     tags: [Invoice to pay]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FacturaPagar'
 *     responses:
 *       200:
 *         description: Invoice to pay created successfully
 */

// GET /api/facturas-pagar/{id}
/**
 * @swagger
 * /api/facturas-pagar/{id}:
 *   get:
 *     summary: Retrieve an invoice to pay by ID
 *     tags: [Invoice to pay]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the invoice to retrieve
 *     responses:
 *       200:
 *         description: Invoice to pay retrieved successfully
 *       404:
 *         description: Invoice to pay not found
 */

// PUT /api/facturas-pagar/{id}
/**
 * @swagger
 * /api/facturas-pagar/{id}:
 *   put:
 *     summary: Update an existing invoice to pay
 *     tags: [Invoice to pay]
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
 *             $ref: '#/components/schemas/FacturaPagar'
 *     responses:
 *       200:
 *         description: Invoice to pay updated successfully
 *       404:
 *         description: Invoice to pay not found
 */

// DELETE /api/facturas-pagar/{id}
/**
 * @swagger
 * /api/facturas-pagar/{id}:
 *   delete:
 *     summary: Delete an invoice to pay
 *     tags: [Invoice to pay]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the invoice to delete
 *     responses:
 *       200:
 *         description: Invoice to pay deleted successfully
 *       404:
 *         description: Invoice to pay not found
 */

// GET /api/facturas-pagar/proveedor/{id}
/**
 * @swagger
 * /api/facturas-pagar/proveedor/{id}:
 *   get:
 *     summary: Retrieve invoices to pay by provider
 *     tags: [Invoice to pay]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the provider
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of invoices to pay by provider
 *       404:
 *         description: Provider not found or no invoices to pay found for the given provider ID
 */

router.route("/").get(obtenerFacturasPagar).post(nuevaFacturaPagar);

router
  .route("/:id")
  .get(obtenerFacturaPagar)
  .put(editarFactura)
  .delete(eliminarFacturaPagar);

router.route("/proveedor/:id").get(obtenerFacturaPagarProveedor);

export default router;
