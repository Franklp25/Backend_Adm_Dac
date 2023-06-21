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
//Esquema de detalle factura
/**
 * @swagger
 * components:
 *   schemas:
 *     DetalleFactura:
 *       type: object
 *       properties:
 *         producto:
 *           $ref: '#/components/schemas/Producto'
 *         precioUnitario:
 *           type: number
 *           description: Unit price of the product
 *         cantidad:
 *           type: number
 *           description: Quantity of the product
 *           default: 1
 *         precio:
 *           type: number
 *           description: Price of the product
 *         descuento:
 *           type: number
 *           description: Discount of the product
 *           default: 0
 *         tarifa:
 *           type: number
 *           description: Rate that is assigned to the product
 *         factura:
 *           $ref: '#/components/schemas/Factura'
 *       required:
 *         - producto
 *         - precioUnitario
 *         - cantidad
 *         - descuento
 *         - tarifa
 *         - factura
 */

//Documentacion de los endpoints
/**
 * @swagger
 * tags:
 *   name: InvoiceDetail
 *   description: API endpoints for managing InvoiceDetail
 * 
 * components:
 *   schemas:
 *     DetalleFactura:
 *       type: object
 *       properties:
 *         producto:
 *           $ref: '#/components/schemas/Producto'
 *         precioUnitario:
 *           type: number
 *           description: Unit price of the product
 *         cantidad:
 *           type: number
 *           description: Quantity of the product
 *           default: 1
 *         precio:
 *           type: number
 *           description: Price of the product
 *         descuento:
 *           type: number
 *           description: Discount of the product
 *           default: 0
 *         tarifa:
 *           type: number
 *           description: Rate that is assigned to the product
 *         factura:
 *           $ref: '#/components/schemas/Factura'
 *       required:
 *         - producto
 *         - precioUnitario
 *         - cantidad
 *         - descuento
 *         - tarifa
 *         - factura
 */

/**
 * @swagger
 * /api/detalle_factura:
 *   post:
 *     summary: Add a new InvoiceDetail
 *     tags: [InvoiceDetail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DetalleFactura'
 *     responses:
 *       200:
 *         description: Successfully added the InvoiceDetail
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/detalle_factura/{id}:
 *   get:
 *     summary: Get an InvoiceDetail by ID
 *     tags: [InvoiceDetail]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the InvoiceDetail
 *     responses:
 *       200:
 *         description: Successfully retrieved the InvoiceDetail
 *       404:
 *         description: InvoiceDetail not found
 *       500:
 *         description: Internal server error
 * 
 *   put:
 *     summary: Update an InvoiceDetail
 *     tags: [InvoiceDetail]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the InvoiceDetail
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DetalleFactura'
 *     responses:
 *       200:
 *         description: Successfully updated the InvoiceDetail
 *       404:
 *         description: InvoiceDetail not found
 *       500:
 *         description: Internal server error
 * 
 *   delete:
 *     summary: Delete an InvoiceDetail
 *     tags: [InvoiceDetail]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the InvoiceDetail
 *     responses:
 *       200:
 *         description: Successfully deleted the InvoiceDetail
 *       404:
 *         description: InvoiceDetail not found
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/detalle_factura/:
 *   get:
 *     summary: Get Stadistics
 *     tags: [InvoiceDetail]
 *     responses:
 *       200:
 *         description: Successfully retrieved the estadisticas
 *       500:
 *         description: Internal server error
 */





router.post("/", agregarDetalle);

router
    .route("/:id")
    .get(obtenerDetalle)
    .put(actualizarDetalle)
    .delete(eliminarDetalle);

/* router 
.route("/")
.get(obtenerDetallesFacturas) */

router.route("/").get(obtenerEstadisticas);

export default router;
