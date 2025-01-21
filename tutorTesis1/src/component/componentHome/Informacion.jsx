import React from "react";
import tecCuliacan from '../../../imagenes/tecCuliacan.png'
import tecNacional from '../../../imagenes/tecNacional.png'
import "./informacion.css"
import Logo from '../../../imagenes/Logo.svg'
export function Informacion() {
  return (
    <div style={{ margin: "2rem auto", width: "80%", textAlign: "center" }}>
      <div className="logos">
        <img src={Logo} alt="" />
        <img src={tecCuliacan} alt="" />
        <img src={tecNacional} alt="" />

      </div>
      <div style={{ marginTop: "1rem", textAlign: "left" }}>
        <h1>Datos Generales</h1>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "1rem",
            backgroundColor: "#f9f9f9",
          }}
        >
          <tbody>
            <tr>
              <td style={styles.td}><strong>Nombre aplicacion:</strong></td>
              <td style={styles.td}>Tutor.ia</td>
            </tr>
            <tr>
              <td style={styles.td}><strong>Versión:</strong></td>
              <td style={styles.td}>1.0.0</td>
            </tr>
            <tr>
              <td style={styles.td}><strong>Nombre del proyecto:</strong></td>
              <td style={styles.td}>
              Tutor inteligente para razonamiento matemático utilizando el enfoque de aprendizaje basado en problemas
              </td>
            </tr>
            <tr>
              <td style={styles.td}><strong>Universidad:</strong></td>
              <td style={styles.td}>Instituto Tecnologico de Culiacan</td>
            </tr>
            <tr>
              <td style={styles.td}><strong>Maestria:</strong></td>
              <td style={styles.td}>Maestria en Ciencias de la Computación</td>
            </tr>
            <tr>
              <td style={styles.td}><strong>Alumno:</strong></td>
              <td style={styles.td}>Mendivil Casanova Julio Cesar</td>
            </tr>
            <tr>
              <td style={styles.td}><strong>Asesor:</strong></td>
              <td style={styles.td}>Dra. María Lucia Barrón Estrada</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  td: {
    padding: "0.5rem",
    border: "1px solid #ddd",
  },
};