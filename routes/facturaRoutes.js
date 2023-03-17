import express from "express";

import {
    obtenerFactura,
    obtenerFacturas,
    nuevaFactura,
    editarFactura,
    eliminarFactura,
} from "../controllers/facturaController.js"

import checkAuth from "../middleware/checkAuth.js"