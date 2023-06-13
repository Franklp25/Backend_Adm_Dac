import express from "express";
import {
    nuevoProveedor,
    obtenerProveedores,
    obtenerProveedor,
    editarProveedor,
    eliminarProveedor,
} from "../controllers/proveedorController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

//Esquema de proveedor
/**
 * @swagger
 * components:
 *   schemas:
 *     Proveedor:
 *       type: object
 *       properties:
 *         tipoCedula:
 *           type: string
 *           description: Type of identification document
 *         cedula:
 *           type: string
 *           description: Identification document number
 *         nombre:
 *           type: string
 *           description: Provider's first name
 *         apellidos:
 *           type: string
 *           description: Provider's last name
 *         telefono:
 *           type: string
 *           description: Provider's phone number
 *         email:
 *           type: string
 *           format: email
 *           description: Provider's email address
 *         direccion:
 *           type: string
 *           description: Provider's address
 *         estatus:
 *           type: boolean
 *           description: Provider's status (active/inactive)
 *       required:
 *         - tipoCedula
 *         - cedula
 *         - nombre
 *         - telefono
 *         - email
 */





/**
 * @swagger
 * tags:
 *   name: Providers
 *   description: Endpoints for managing providers
 */

/**
 * @swagger
 * /api/proveedores:
 *   get:
 *     summary: Get all providers
 *     tags: [Providers]
 *     responses:
 *       200:
 *         description: List of providers
 *   post:
 *     summary: Create a new provider
 *     tags: [Providers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proveedor'
 *     responses:
 *       200:
 *         description: Provider created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proveedor'
 */

/**
 * @swagger
 * /api/proveedores/{id}:
 *   get:
 *     summary: Get a provider by ID
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Provider ID
 *     responses:
 *       200:
 *         description: Provider found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proveedor'
 *   put:
 *     summary: Update a provider
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Provider ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proveedor'
 *     responses:
 *       200:
 *         description: Provider updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proveedor'
 *   delete:
 *     summary: Delete a provider
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Provider ID
 *     responses:
 *       200:
 *         description: Provider deleted successfully
 */



router.route("/").get(obtenerProveedores).post(nuevoProveedor);

router
    .route("/:id")
    .get(obtenerProveedor)
    .put(editarProveedor)
    .delete(eliminarProveedor);

export default router;
