import express from "express";
const router = express.Router();

import {
    registrar,
    autenticar,
    confirmar,
    olvidarPassword,
    comprobarToken,
    nuevoPassword,
    perfil,
} from "../controllers/usuarioController.js";

import checkAuth from "../middleware/checkAuth.js";

//area publica
//Autenticacion y Registro de usuarios
//Esquema de usuario
/**
 * @swagger
 * components:
 *  schemas:
 *      Usuario:
 *          type: object
 *          required:
 *              - nombre
 *              - password
 *              - email
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: The user name
 *              password:
 *                  type: string
 *                  description: The user password
 *              email:
 *                  type: string
 *                  description: the user email
 *          example:
 *              nombre: Usuario
 *              password: 123456
 *              email: Usuario@correo.com
 */

//Crear nuevo usuario
/**
 * @swagger
 * /api/usuarios:
 *  post:
 *      summary: Register a new user
 *      tags: [Usuarios]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Usuario'
 *      responses:
 *          200:
 *              description: Usuario creado correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Usuario'
 */
router.post("/", registrar);

//autentifica a los usuarios

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Authenticate user
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *             example:
 *               email: example@example.com
 *               password: secretPassword
 *     responses:
 *       200:
 *         description: Successful authentication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: User ID
 *                 nombre:
 *                   type: string
 *                   description: User's name
 *                 email:
 *                   type: string
 *                   description: User's email
 *                 token:
 *                   type: string
 *                   description: Authentication token
 *             example:
 *               _id: 1234567890
 *               nombre: John Doe
 *               email: example@example.com
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJpYXQiOjE2MzAwMDAwMDAsImV4cCI6MTYzMDAwMDAwMH0.5KfwHdK2fXjdtV1IVhXtCkUSbQwzFfB68nOfI2mzZyU
 *       403:
 *         description: Authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *             example:
 *               msg: Contraseña incorrecta
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *             example:
 *               msg: El usuario no está registrado
 */

router.post("/login", autenticar);

//Confirma token del usuario

/**
 * @swagger
 * /api/confirmar/{token}:
 *   get:
 *     summary: Confirm user account
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Token for account confirmation
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User account confirmed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Success message
 *             example:
 *               msg: Usuario confirmado correctamente
 *       403:
 *         description: Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *             example:
 *               msg: Token no válido
 */

router.get("/confirmar/:token", confirmar); //routing dinamico

//olvida cuenta de usuario
/**
 * @swagger
 * /api/olvidar-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *             example:
 *               email: example@example.com
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Success message
 *             example:
 *               msg: Te hemos enviado un correo, revisa tu bandeja de entrada
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *             example:
 *               msg: El usuario no está registrado
 */

router.post("/olvidar-password", olvidarPassword);

//validar token cuando olvida password
/**
 * @swagger
 * /api/olvidar-password/{token}:
 *   get:
 *     summary: Check password reset token validity
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Password reset token
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Valid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Success message
 *             example:
 *               msg: Token válido
 *       404:
 *         description: Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *             example:
 *               msg: Token no válido
 */

router.get("/olvidar-password/:token", comprobarToken);

//validar token cuando olvida password
/**
 * @swagger
 * /api/olvidar-password/{token}:
 *   post:
 *     summary: Set new password
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Password reset token
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: New password
 *             example:
 *               password: newPassword123
 *     responses:
 *       200:
 *         description: Password modified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Success message
 *             example:
 *               msg: Contraseña modificada correctamente
 *       404:
 *         description: Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *             example:
 *               msg: Token no válido
 */

router.post("/olvidar-password/:token", nuevoPassword);

//area privada
/**
 * @swagger
 * /api/perfil:
 *   get:
 *     summary: Get user profile
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Unauthorized request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *             example:
 *               msg: Token no válido
 *       404:
 *         description: Error retrieving user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *             example:
 *               msg: Hubo un error
 */

router.get("/perfil", checkAuth, perfil);

export default router;
