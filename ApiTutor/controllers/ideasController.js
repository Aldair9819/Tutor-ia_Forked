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
      const { idusuario, idejercicio, idea, conclusion, resultado, intento } = req.body;
      console.log("idu: "+ idusuario + "ide: " + idejercicio + "idea: " + idea + "conculusion: " + conclusion + " resultado: " + resultado + "intento : "+ intento) 
      const nuevaIdea = await ideasModels.create({ idusuario, idejercicio, idea, conclusion, resultado, intento });
      res.status(201).json(nuevaIdea);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la idea de usuario' });
    }
  };
  