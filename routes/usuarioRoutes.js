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
router.post("/", registrar); //Crear nuevo usuario
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar); //routing dinamico
router.post("/olvidar-password", olvidarPassword);
router.get("/olvidar-password/:token", comprobarToken); //validar token cuando olvida password
router.post("/olvidar-password/:token", nuevoPassword); //validar token cuando olvida password

//area privada
router.get("/perfil", checkAuth, perfil);

export default router;
