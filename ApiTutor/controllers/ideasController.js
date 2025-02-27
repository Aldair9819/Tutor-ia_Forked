import { ideasModels } from "../models/ideasModels.js";

export const getIdeasUsuarios = async (req, res) => {
    try {
      const ideasUsuarios = await ideasModels.findAll();
      res.json(ideasUsuarios);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las ideas de los usuarios' });
    }
  };


  export const createIdeaUsuario = async (req, res) => {
    try {
        const { idusuario, idejercicio, idea, conclusion, resultado, intento, respuesta } = req.body;

        // Verificar si los parámetros necesarios están presentes
        if (!idusuario || !idejercicio || !idea || !conclusion || typeof resultado !== "boolean" || typeof intento !== "number") {
            return res.status(400).json({ error: "Faltan parámetros requeridos o son inválidos" });
        }

        console.log("Datos recibidos: ", { idusuario, idejercicio, idea, conclusion, resultado, intento, respuesta });

        // Intentar crear el registro en la base de datos
        const nuevaIdea = await ideasModels.create({
            idusuario, 
            idejercicio, 
            idea, 
            conclusion, 
            resultado, 
            intento, 
            respuesta
        });

        // Enviar respuesta exitosa
        return res.status(201).json(nuevaIdea);
    } catch (error) {
        console.error("Error al crear la idea de usuario:", error.message);  // Detalles del error en la consola

        // Enviar un mensaje de error detallado al cliente
        return res.status(500).json({ 
            error: 'Error al crear la idea de usuario', 
            details: error.message 
        });
    }
};

  