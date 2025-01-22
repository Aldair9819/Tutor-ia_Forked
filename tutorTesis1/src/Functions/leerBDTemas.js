import axios from "axios";
const URI = "https://proyectotutoria.onrender.com/api/"

export class LeerBDTemas {
  // Constructor que inicializa la base de datos
  

  // Método para obtener el nombre del tema
  async regresaNombreDelTema(numTema) {

    try {
      // Realiza la solicitud GET para obtener todos los temas
      const response = await axios.get(`${URI}temas`);
  
      // Verifica que la respuesta sea un arreglo
      if (Array.isArray(response.data)) {
        // Busca el tema con el ID proporcionado
        const temaEncontrado = response.data.find((tema) => tema.id === numTema);
  
        if (temaEncontrado) {
          return temaEncontrado.nombre; // Devuelve el nombre del tema
        } else {
          console.warn(`No se encontró ningún tema con el ID: ${numTema}`);
          return "Tema no encontrado";
        }
      } else {
        console.error("La respuesta de la API no es un arreglo válido.");
        throw new Error("La respuesta de la API no es un arreglo válido.");
      }
    } catch (error) {
      console.error("Error al obtener los temas:", error.message);
      throw new Error("No se pudo obtener el nombre del tema.");
    }
  }

  async obtenerDetallesDelTema(idTema) {
    try {
      const response = await axios.get(`${URI}/temas/${idTema}`);
      const tema = response.data;
      // Validar que la respuesta contenga los datos esperados
      if (tema && tema.nombre && tema.descripcion) {
        return {
          nombre: tema.nombre,
          descripcion: tema.descripcion,
        };
      } else {
        throw new Error("La respuesta de la API no contiene los datos esperados.");
      }
    } catch (error) {
      console.error("Error al obtener los detalles del tema:", error.message);
      throw new Error("No se pudieron obtener los detalles del tema.");
    }
  }
  
  // Método para obtener los problemas de un tema específico
  async devolverProblemas(numTema, numProblema) {
    // Verificar que el tema y el problema son válidos
    if (numTema >= 0 && numProblema >= 0) {
      try {
        // Hacer la solicitud a la API para obtener todos los ejercicios del tema
        const response = await axios.get(`${URI}ejercicios/tema/${numTema}`);
        
            
        // Verificar que la respuesta de la API sea exitosa
        if (response.status === 200) {
          const ejercicios = response.data;  // Axios maneja la conversión a JSON automáticamente
  
          // Verificar que el arreglo no esté vacío y que numProblema sea un índice válido
          if (ejercicios.length > 0 && numProblema <= ejercicios.length) {
            // Obtener el ejercicio en la posición numProblema
            const ejercicio = ejercicios[numProblema-1];
            return {
              problema: ejercicio
            };
          } else {
            console.error("Índice inválido o problema no encontrado.");
            return { error: "Problema no encontrado o índice inválido" }; // Manejo de errores si el problema no existe
          }
        } else {
          console.error("Error en la respuesta de la API. Código de estado:", response.status);
          return { error: "Error al obtener los datos de los ejercicios" }; // Manejo de errores si la respuesta de la API falla
        }
      } catch (error) {
        console.error("Error en la conexión con la API:", error);
        return { error: "Error en la conexión con la API" }; // Manejo de errores en la conexión
      }
    } else {
      console.error("Tema o problema no válido.");
      return { error: "Tema o problema no válido" }; // Manejo de errores si los números de tema o problema no son válidos
    }
  }


  async devolverCantidadDeProblemas(numTema) {
    try {
      // Llamada a la API para obtener los ejercicios del tema
      const response = await axios.get(`${URI}ejercicios/tema/${numTema}`);
      // Validar si la respuesta contiene un arreglo y devolver su longitud
      if (Array.isArray(response.data)) {
        return response.data.length; // Cantidad de ejercicios
      } else {
        console.error("Formato de datos inesperado:", response.data);
        return 0; // Si el formato no es válido, devuelve 0
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
      return { error: "No se pudo conectar con la API o el tema no existe" };
    }
  }
  // Método para obtener todos los temas (opcional, si necesitas listar todos los temas)
  async obtenerTodosLosTemas() {
  
    try {
      // Realiza una solicitud GET a la API
      const response = await axios.get(`${URI}temas`);

      // Verifica que la respuesta sea un arreglo antes de mapearlo
      if (Array.isArray(response.data)) {
        // Mapea los temas para devolver un formato consistente
        
        return response.data.map((tema, index) => ({
          index,
          nombre: tema.nombre, // Asume que cada tema tiene una propiedad 'nombre'
        }));
      } else {
        console.error("La respuesta de la API no es un arreglo válido.");
        throw new Error("La respuesta de la API no es un arreglo válido.");
      }
    } catch (error) {
      console.error("Error al obtener los temas:", error.message);
      throw new Error("No se pudieron obtener los temas");
    }
  }

  async obtenerRutaDeImagen(idProblema) {
    try {
      const response = await axios.get(`${URI}imagenes/${idProblema}`);
  
      if (response.data && Array.isArray(response.data)) {
        return response.data.map(imagen => imagen.url); // Devuelve un arreglo con las URLs de las imágenes
      } else {
        console.error("No se encontraron imágenes para este ejercicio.");
        return []; // Devuelve un arreglo vacío si no hay imágenes
      }
    } catch (error) {
      console.error("Error al obtener las imágenes del ejercicio:", error.message);
      throw new Error("No se pudieron obtener las imágenes del ejercicio");
    }
  }
}



