import React, { useEffect, useState }  from "react";
import { LeerBDTemas } from "../../Functions/leerBDTemas";
import { LeerBDUsuario } from "../../Functions/leerBDUsuario";
import { useUsuario } from "./componenteAprender/usuarioContext";
export function Calificacion() {
  const [temas, setTemas] = useState([]); // Estado para almacenar los temas
  const leerTemas = new LeerBDTemas();
  const leerUsuarios = new LeerBDUsuario();
  const [ejerciciosPorTema, setEjerciciosPorTema] = useState({});
  const [avancesPorTema, setAvancesPorTema] = useState([]); // Estado para almacenar los avances por tema
  const { idUsuario } = useUsuario(); // Obtiene el ID del usuario del contexto
  
  // Cargar los temas al montar el componente
  useEffect(() => {
    async function fetchTemas() {
      try {
        const data = await leerTemas.obtenerTodosLosTemas(); // Asume que devuelve una promesa
        setTemas(data); // Guardar los temas en el estado
      } catch (error) {
        console.error("Error al cargar los temas:", error);
      }
    }
    fetchTemas();
  }, []);
  useEffect(() => {
    async function fetchEjercicios() {
      try {
        const resultados = []; // Arreglo para almacenar los resultados
        for (const tema of temas) {
          const cantidad = await leerTemas.devolverCantidadDeProblemas(tema.index+1); // Consultar la cantidad de ejercicios
          resultados.push({ id: tema.index+1, cantidad }); // Agregar al arreglo
        }
        setEjerciciosPorTema(resultados); // Actualizar el estado con los resultados
      } catch (error) {
        console.error("Error al cargar la cantidad de ejercicios:", error);
      }
    }
  
    if (temas.length > 0) {
      fetchEjercicios(); // Ejecutar si hay temas cargados
    }
  }, [temas]);
  
  useEffect(() => {
    async function fetchAvances() {
      try {
        const avances = []; // Arreglo para almacenar los avances
        for (const tema of ejerciciosPorTema) {
          const avance = await leerUsuarios.devolverAvancesDelTema(idUsuario, tema.id); // Consulta los avances del usuario por tema
          if (avance) {
            avances.push({ temaId: tema.id, avance }); // Agrega el avance al arreglo
          }
        }
        console.log("el avance es:")

        console.log(avances)
        setAvancesPorTema(avances); // Actualiza el estado con los avances
      } catch (error) {
        console.error("Error al cargar los avances:", error);
      }
    }

    if (ejerciciosPorTema.length > 0) {
      fetchAvances(); // Ejecutar si hay ejercicios por tema cargados
    }
  }, [ejerciciosPorTema]);

  const data = [
    { tema: "Álgebra", ejercicio: 1, completado: true, intentos: 2 },
    { tema: "Álgebra", ejercicio: 2, completado: false, intentos: 3 },
    { tema: "Geometría", ejercicio: 1, completado: true, intentos: 1 },
    { tema: "Geometría", ejercicio: 2, completado: false, intentos: 2 },
    { tema: "Cálculo", ejercicio: 1, completado: true, intentos: 1 },
    { tema: "Cálculo", ejercicio: 2, completado: false, intentos: 4 },
  ];
  // Agrupar datos por tema
  const temasAgrupados = data.reduce((acc, item) => {
    if (!acc[item.tema]) {
      acc[item.tema] = [];
    }
    acc[item.tema].push(item);
    return acc;
  }, {});
  console.log("tema agrupado")
  console.log(temasAgrupados)
  return (
    <div style={{ margin: "2rem auto", width: "80%", textAlign: "center" }}>
      <h1>Calificaciones</h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "1rem",
          backgroundColor: "#f9f9f9",
        }}
      >
        <thead style={{ backgroundColor: "#4CAF50", color: "white" }}>
          <tr>
            <th style={styles.th}>Tema</th>
            <th style={styles.th}>Número de Ejercicio</th>
            <th style={styles.th}>Completado</th>
            <th style={styles.th}>Número de Intentos</th>
          </tr>
        </thead>
        <tbody>
          {avancesPorTema.map(({ temaId, avance }) => {
            // Calcular porcentaje de avance por tema
            const completados = avance.filter((e) => e.resultado).length;
            const porcentaje = avance.length
              ? ((completados / avance.length) * 100).toFixed(2)
              : 0;

            return (
              <React.Fragment key={temaId}>
                {avance.length > 0 ? (
                  avance.map((ejercicio, index) => (
                    <tr key={index}>
                      {index === 0 && (
                        <td style={styles.td} rowSpan={avance.length}>
                      Tema {temaId}
                        </td>
                      )}
                      <td style={styles.td}>{ejercicio.ejercicio}</td>
                      <td style={styles.td}>
                        {ejercicio.resultado ? "Sí" : "No"}
                      </td>
                      <td style={styles.td}>{ejercicio.intentos}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td style={styles.td}>Tema {temaId}</td>
                    <td style={styles.td}>NaN</td>
                    <td style={styles.td}>NaN</td>
                    <td style={styles.td}>NaN</td>
                  </tr>
                )}
                <tr>
                  <td colSpan="4" style={styles.tdPorcentaje}>
                Porcentaje de avance en <strong>Tema {temaId}</strong>:{" "}
                    {porcentaje}%
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  th: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
  },
  tdPorcentaje: {
    padding: "10px",
    backgroundColor: "#f1f1f1",
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#555",
    border: "1px solid #ddd",
  },
};
