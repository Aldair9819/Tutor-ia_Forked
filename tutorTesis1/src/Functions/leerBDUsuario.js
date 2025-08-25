import axios from "axios";
const URI = import.meta.env.VITE_URI;

export class LeerBDUsuario {
  // Validar usuario y contraseña

  async crearUsuario({ nombre, usuario, correo, contrasena, confirmar_contrasena }) {

    if (contrasena !== confirmar_contrasena){
      return { success: false, message: "Error. Contraseña no son iguales" }; 
    }
    
    try {
      const res = await axios.post(`${URI}users`, {
        "user": usuario,
        "nombre": nombre,
        "correo": correo,
        "contrasena": contrasena,
      });
      return { success: true, message: res.data };
    } catch (error) {
      const message = error || "Error al conectar con el servidor";
      return { success: false, message: message.response?.data?.message || message };
    }
  }

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

  async  registrarIntento(usuario, idejercicio, idea, conclusion, resultado, respuesta) {
    
    try {
  
      let intento = 0; // Valor predeterminado
  
      // Primer POST para obtener el número de intentos previos
      try {
        const res1 = await axios.post(`${URI}ejerciciosResueltos`, {
          "idusuario": usuario,
          "idejercicio": idejercicio,
          "resuelto": resultado
        });
  
  
        // Verificamos si la respuesta contiene datos válidos
        if (res1.data && res1.data.registro && typeof res1.data.registro.intentos !== "undefined") {
          intento = res1.data.registro.intentos;
        } else {
          console.warn("Advertencia: No se obtuvo el número de intentos. Se usará 0.");
        }
      } catch (error) {
        console.error("Error en la solicitud de intentos:", error.message);
        return null; // Detenemos el flujo si hay un error en esta solicitud
      }
  
  
      // Validamos que respuesta sea un array, si no, asignamos valor predeterminado
      const respuestaFinal = Array.isArray(respuesta) ? respuesta.join(',') : respuesta || "vacio";
  
      // Segundo POST para registrar la idea
      const res2 = await axios.post(`${URI}ideasusuario`, {
        "idusuario": usuario,
        "idejercicio": idejercicio,
        "idea": idea,
        "conclusion": conclusion,
        "resultado": resultado,
        "intento": intento,
        "respuesta": respuestaFinal // Usamos el valor procesado de respuesta
      });
  
  
      // Validamos si la respuesta del segundo POST fue exitosa
      if (res2.status === 200 || res2.status === 201) {
        return res2.data; // Devolver los datos registrados
      } else {
        // Si el código de estado no es 200 o 201, mostramos detalles del error
        console.error("Error en el registro del intento:", res2.status, res2.statusText, res2.data);
        return null;
      }
    } catch (error) {
      // Manejo de errores global en caso de que algo falle en la función principal
      console.error("Error general al registrar el intento:", error.message);
      return null; // En caso de error general, retornamos null
    }
  }
  
  async  registraridea(usuario, idejercicio, idea) {
  
    try {
  
      // Primera consulta para obtener información del ejercicio
      const res1 = await axios.post(`${URI}ejerciciosAvanceId`, {
        "id": usuario,
        "idejercicio": idejercicio
      });
  
  
      // Validamos que res1.data tenga la estructura esperada
      let resultado = false;  // Asignamos un valor booleano por defecto
      let intento = 0;
  
      if (res1.data && typeof res1.data.intentos !== "undefined") {
        resultado = res1.data.resuelto === true;  // Evaluamos directamente como booleano
        intento = res1.data.intentos;
      } else {
        console.warn("Advertencia: No se obtuvo información válida de intentos, se usará 0.");
      }
  
      // Segunda consulta para registrar la idea
      const res = await axios.post(`${URI}ideasusuario`, {
        "idusuario": usuario,
        "idejercicio": idejercicio,
        "idea": idea,
        "conclusion":  "No Aplica",
        "resultado": resultado,
        "intento": intento,
        "respuesta": "vacio"
      });
  
  
      // Validar si la respuesta fue exitosa
      if (res.status === 200 || res.status === 201) {
        return res.data; // Devolver los datos registrados
      } else {
        console.error("Error en el registro del intento:", res.status, res.statusText);
      }
    } catch (error) {
      console.error("Error al registrar el intento:", error.message);
      throw error; // Propagar el error si es necesario
    }
  }
  
}

