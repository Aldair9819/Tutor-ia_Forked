import axios from "axios";
const URI = "http://localhost:8000/api/"
export class LeerBDUsuario {
  // Validar usuario y contraseña
  async validarUsuarioyContraseña({ usuario, contrasena }) {
    try {
      const res = await axios.post(`${URI}login`, {
        user: usuario,
        contrasena: contrasena,
      });

      if (res.status === 200 && res.data.message === "Inicio de sesión exitoso") {
        return {
          success: true,
          message: res.data.message,
          data: {
            token: res.data.token,
            idUsuario: res.data.idUsuario,
          },
        };
      }

      return {
        success: false,
        message: res.data.message || "Error desconocido",
      };
    } catch (error) {
      const message = error.response?.data?.message || "Error al conectar con el servidor";
      return { success: false, message };
    }
  }

  // Obtener todos los usuarios
  async devolverUsuarios() {
    try {
      const res = await axios.get(`${URI}users/`);
      return res.data; // Retorna directamente los datos de la respuesta
    } catch (error) {
      const message = error.response?.data?.message || "Error al conectar con el servidor";
      return { success: false, message };
    }
  }

  // Retornar temas concluidos
  devolverTemasConcluidos(usuario) {
    return [1, 2]; // Datos simulados
  }

  // Retornar problemas resueltos
  async devolverProblemasResueltosDelTema(usuario, tema) {
    console.log("devolver problemas resueltos")
    try {
      // Enviar usuario y tema como parámetros en la solicitud POST
      const res = await axios.post(`${URI}ejerciciosResueltosbytema`, {
        id: usuario,
        tema: tema,
      });
  
      // Obtener los ejercicios del tema
      const res2 = await axios.get(`${URI}ejercicios/tema/${tema}`);
  
      // Agregar nueva ID secuencial a todos los ejercicios en res2
      const ejerciciosConNuevaId = res2.data.map((ejercicio, index) => ({
        ...ejercicio, // Copiar las propiedades originales
        nuevaId: index + 1, // Asignar nueva ID secuencial
      }));
      console.log("ejercicios nueva id")
      console.log(ejerciciosConNuevaId)

      // Filtrar los ejercicios que están resueltos en res
      const ejerciciosResueltos = res.data.filter(ejercicio => ejercicio.resultado === true);
      
      // Comparar las id de ejercicios resueltos con los de res2 y devolver la nuevaId
      const nuevaIdsResueltos = ejerciciosResueltos
        .map(ejercicioResuelto => {
          // Buscar el ejercicio correspondiente en res2
          const ejercicioConNuevaId = ejerciciosConNuevaId.find(ejercicio => ejercicio.id === ejercicioResuelto.idejercicio);
          // Si se encuentra, devolver la nuevaId
          return ejercicioConNuevaId ? ejercicioConNuevaId.nuevaId : null;
        })
        .filter(nuevaId => nuevaId !== null); // Filtrar los valores nulos en caso de que no haya coincidencias
      console.log("ejercicios nuevaIdsResueltos ")
      console.log(nuevaIdsResueltos)
      // Retornar las nuevas IDs de los ejercicios resueltos
      return nuevaIdsResueltos;
  
    } catch (error) {
      const message =
        error.response?.data?.message || "Error al conectar con el servidor";
      return { success: false, message };
    }
  }
  

  // Marcar todos los ejercicios de un usuario como no resueltos
  async reiniciarEjerciciosDeUsuario(usuario) {
    try {
      const res = await axios.put(`${URI}ejerciciosResueltos/${usuario}/reset`);
      return res.data; // Supone que el servidor retorna la lista actualizada
    } catch (error) {
      const message = error.response?.data?.message || "Error al conectar con el servidor";
      return { success: false, message };
    }
  }
}
