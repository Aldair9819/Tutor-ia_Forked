import TemaModels from "../models/TemaModels.js";

// Obtener todos los temas
export const getTemas = async (req, res) => {
  console.log("obteniendo temas");
  try {
    // Realiza la consulta para obtener todos los temas
    const temas = await TemaModels.findAll();
    
    // Retorna los temas en la respuesta
    res.json(temas);
    console.log("Temas obtenidos:", temas);
  } catch (error) {
    console.error("Error al obtener los temas:", error.message);
    res.status(500).json({ message: "Error al obtener los temas", error: error.message });
  }
};
export const getTemaById = async (req, res) => {
  const { id } = req.params; // Obtén el ID desde los parámetros de la URL
  console.log(`Obteniendo tema con ID: ${id}`);
  
  try {
    // Busca el tema en la base de datos utilizando la ID
    const tema = await TemaModels.findByPk(id);

    // Verifica si se encontró el tema
    if (!tema) {
      return res.status(404).json({ message: "Tema no encontrado" });
    }

    // Retorna el tema en la respuesta
    res.json(tema);
    console.log("Tema obtenido:", tema);
  } catch (error) {
    console.error("Error al obtener el tema:", error.message);
    res.status(500).json({ message: "Error al obtener el tema", error: error.message });
  }
};
