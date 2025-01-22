import { ImagenesEjerModels } from "../models/imagenesEjerModels.js";

export const getimagenesbyEjercicio = async (idejercicio) => {
    try {
        // Consultar imágenes relacionadas con un ejercicio específico
        const imagenes = await ImagenesEjerModels.findAll({
            where: { idejercicio }, // Filtro por el ID del ejercicio
        });

        return imagenes;
    } catch (error) {
        console.error("Error al obtener imágenes por ejercicio:", error);
        throw error; // Propaga el error para manejarlo en el controlador o middleware
    }
};