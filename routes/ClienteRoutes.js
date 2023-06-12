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

//Esquema de cliente
/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Endpoints for managing clients
 *
 * components:
 *   schemas:
 *     Cliente:
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
 *           description: Client's first name
 *         apellidos:
 *           type: string
 *           description: Client's last name
 *         telefono:
 *           type: string
 *           description: Client's phone number
 *         email:
 *           type: string
 *           format: email
 *           description: Client's email address
 *         direccion:
 *           type: string
 *           description: Client's address
 *         estatus:
 *           type: boolean
 *           description: Client's status (active/inactive)
 *       required:
 *         - tipoCedula
 *         - cedula
 *         - nombre
 *         - telefono
 *         - email
 *
 * /api/clientes:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Successfully retrieved list of clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 *   post:
 *     summary: Register a new client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Client created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *
 * /api/clientes/{id}:
 *   get:
 *     summary: Get a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the client
 *     responses:
 *       200:
 *         description: Client retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Client not found
 *   put:
 *     summary: Update a client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the client
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Client updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Client not found
 *   delete:
 *     summary: Delete a client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the client
 *     responses:
 *       200:
 *         description: Client deleted successfully
 *       404:
 *         description: Client not found
 */

router.route("/").get(obtenerClientes).post(nuevoCliente);

router
    .route("/:id")
    .get(obtenerCliente)
    .put(editarCliente)
    .delete(eliminarCliente);

export default router;
