import { EjerciciosModels } from "../models/EjerciciosModels.js";


export const getEjercicios = async (req, res) => {
    try {
        const ejercicios = await EjerciciosModels.findAll();
        res.json(ejercicios);
    } catch (error) {
        console.error("Error al obtener los ejercicios:", error);  // Imprime el error detallado
        res.status(500).json({ message: "Error al obtener los ejercicios", error: error.message });
    }
};

export const getEjerciciosById = async (req, res)=>{
    const {id} = req.params;
    try {
        const ejercicio = await EjerciciosModels.findByPk(id)
        if(!ejercicio){
            return res.status(404).json({message: "ejercicio no encontrado"})
        }
        res.json(ejercicio)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el ejercicios ",error: error.message});
    }
}
export const getEjerciciosByTema = async (req, res) => {
    console.log("Parámetros recibidos:", req.params);
    const { temaId } = req.params; 
    try {
        // Busca todos los ejercicios que correspondan al idTema
        const ejercicios = await EjerciciosModels.findAll({ where: { temaId } });

        // Verifica si no se encontraron ejercicios
        if (!ejercicios || ejercicios.length === 0) {
            return res.json([]); // Devuelve un arreglo vacío
        }

        // Retorna los ejercicios encontrados
        res.json(ejercicios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: "Error al obtener los ejercicios", 
            error: error.message 
        });
    }
};


export const crearEjercicio = async (req, res)=>{
    try {
        const {titulo, descripcion, nivel_dificultad, respuesta} =req.body;
        const newEjercicio = await EjerciciosModels.create({titulo, descripcion, nivel_dificultad, respuesta})
        res.status(201).json({message: "ejercicio creado con excito", ejercicio: newEjercicio})
    } catch (error) {
        res.json({message: "no se pudo crear hubo un error m:", error: error.message})
    }
}