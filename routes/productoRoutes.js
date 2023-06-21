import express from "express";

import {
    nuevoProducto,
    obtenerProducto,
    obtenerProductos,
    editarProducto,
    eliminarProducto,
} from "../controllers/productoController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

//Esquema de producto
/**
 * @swagger
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       properties:
 *         codigo:
 *           type: string
 *           default: NA
 *           description: Code of the product
 *         nombre:
 *           type: string
 *           description: Name of the product
 *         unidadMedida:
 *           type: string
 *           description: Unit of measurement for the product
 *         cantidad:
 *           type: number
 *           description: Quantity of the product
 *           default: 1
 *         precio:
 *           type: number
 *           description: Price of the product
 *         descripcion:
 *           type: string
 *           description: Description of the product
 *       required:
 *         - nombre
 *         - unidadMedida
 *         - cantidad
 *         - precio
 *         - descripcion
 */

// Documentation for all Producto endpoints
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API to manage products
 * /api/productos:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successfully retrieved list of products
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       200:
 *         description: Product created successfully
 *
 * /api/productos/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *       404:
 *         description: Product not found
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *   delete:
 *     summary: Delete an existing product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */





router.route("/").get(obtenerProductos).post(nuevoProducto);

router
    .route("/:id")
    .get(obtenerProducto)
    .put(editarProducto)
    .delete(eliminarProducto);

export default router;