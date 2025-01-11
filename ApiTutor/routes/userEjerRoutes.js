import express from "express";
import {  getEjerciciosResueltosPorUsuario, getEjerciciosPorUsuario, actualizarEjercicioUsuario, resetearEjerciciosUsuario } from "../controllers/usarEjerController.js";

const router = express.Router();

// Ruta para obtener todos los ejercicios con relaciones
router.get("/ejerciciosResueltos", getEjerciciosResueltosPorUsuario);
router.post("/ejerciciosResueltosbytema", getEjerciciosPorUsuario);
router.post("/ejerciciosResueltos", actualizarEjercicioUsuario);
router.post("/resetearEjerciciosUsuario", resetearEjerciciosUsuario);
//Ruta para obtener los ejercicios resueltos por usuario
//router.get("/ejercicios/resueltos/:idusuario", getEjerciciosResueltosPorUsuario);

export default router;
