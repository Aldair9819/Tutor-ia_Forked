import express from "express";
import { getTemas, getTemaById } from "../controllers/temasControllers.js";  // Asegúrate de que el controlador esté importado correctamente.

const router = express.Router();

// Ruta para obtener todos los temas
router.get("/temas", getTemas);
router.get("/temas/:id", getTemaById);
export default router;
