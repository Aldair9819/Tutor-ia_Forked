import express from "express";

import { getIdeasUsuarios, createIdeaUsuario } from "../controllers/ideasController.js";

const router = express.Router();

router.get('/ideasusuario', getIdeasUsuarios); // Obtener todas las ideas
router.post('/ideasusuario', createIdeaUsuario); // Crear una nueva idea

export default router;