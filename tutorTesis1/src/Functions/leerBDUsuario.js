import axios, { Axios } from "axios";
const URI = "https://proyectotutoria.onrender.com/api/"
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
  async devolverUsuariosById({idUsuario}){
    try{
      const res = await axios.get(`${URI}users/${idUsuario}`)
      return res.data;
    } catch (error){
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

      // Comparar las id de ejercicios resueltos con los de res2 y devolver la nuevaId
      const nuevaIdsResueltos =res.data
        .map(ejercicioResuelto => {
          // Buscar el ejercicio correspondiente en res2
          const ejercicioConNuevaId = ejerciciosConNuevaId.find(ejercicio => ejercicio.id === ejercicioResuelto.idejercicio);
          // Si se encuentra, devolver la nuevaId
          return ejercicioConNuevaId ? ejercicioConNuevaId.nuevaId : null;
        })
        .filter(nuevaId => nuevaId !== null); // Filtrar los valores nulos en caso de que no haya coincidencias
      return nuevaIdsResueltos;
  
    } catch (error) {
      const message =
        error.response?.data?.message || "Error al conectar con el servidor";
      return { success: false, message };
    }
  }

  async devolverAvancesDelTema(usuario, tema) {
    try {
  
      // Enviar usuario y tema como parámetros en la solicitud POST
      const res = await axios.post(`${URI}ejerciciosResueltosbytemaT`, {
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
  
      // Comparar las id de ejercicios resueltos con los de res2 y devolver la nueva estructura
      const ejerciciosConAvance = ejerciciosConNuevaId.map(ejercicio => {
        // Buscar el ejercicio resuelto en res.data
        const ejercicioResuelto = res.data.find(
          resuelto => resuelto.idejercicio === ejercicio.id
        );
      
        return {
          ejercicio: ejercicio.nuevaId, // Usar la nueva ID secuencial
          intentos: ejercicioResuelto ? ejercicioResuelto.intentos : 0, // Número de intentos (o 0 si no está resuelto)
          resultado: ejercicioResuelto ? ejercicioResuelto.resuelto : false, // Resultado del ejercicio (o false si no está resuelto)
        };
      });
  
      return ejerciciosConAvance; // Devuelve el arreglo con el formato completo
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

  async registrarIntento( usuario, idejercicio, idea, conclusion, resultado, intento){
    try{
      console.log("registrandoooo0");
      const res1 = await axios.post(`${URI}ejerciciosResueltos`,{
        "idusuario": usuario,
        "idejercicio": idejercicio,
        "resuelto": resultado
      });
      console.log("registrandoooo1");
      const res = await axios.post(`${URI}ideasusuario`,{
        "idusuario": usuario,
        "idejercicio": idejercicio,
        "idea": idea,
        "conclusion": conclusion,
        "resultado": resultado,
        "intento": res1.data.registro.intentos
      });          
      console.log("registrandoooo2");
       
      if (res.status === 200 || res.status === 201) {
        return res.data; // Devuelve los datos de la respuesta si es necesario
      } else {
        console.error("Error en el registro del intento:", res.status, res.statusText);
      }

    }catch(error){
      console.error("Error al registrar el intento:", error.message);
      // Opcional: puedes manejar el error aquí o lanzar una excepción
      throw error;
    }
  }
}
