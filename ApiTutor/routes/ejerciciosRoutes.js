import express from "express";
import { getEjercicios, crearEjercicio, getEjerciciosById, getEjerciciosByTema   } from "../controllers/ejerciciosControllers.js";

const router = express.Router();

//ruta para obtener todos los ejerecicios
router.get("/ejercicios", getEjercicios);


router.post("/ejercicios", crearEjercicio);
router.get("/ejercicios/:id", getEjerciciosById)
router.get("/ejercicios/tema/:temaId", getEjerciciosByTema);
export default router