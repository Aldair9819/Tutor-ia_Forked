import express from "express";
import { getimagenesbyEjercicio } from "../controllers/imagenesEjerControllers.js";

const router = express.Router();

router.get("/imagenes/:idejercicio", async (req, res) => {
    const { idejercicio } = req.params;

    try {
        const imagenes = await getimagenesbyEjercicio(idejercicio);
        res.json(imagenes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener imágenes", error });
    }
});

export default router;
