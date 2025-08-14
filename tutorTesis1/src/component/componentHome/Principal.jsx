/* eslint-disable react/react-in-jsx-scope */
import { Cartelera } from "./Principal/componentes/cartelera";
import { Informacion } from "./Principal/componentes/informacion";
import "./Principal.css"; // Agrega un archivo CSS para el estilo general de la página
export function Principal() {
  return (
    <div className="principal-container">
      <Cartelera />
      <Informacion />
    </div>
  );
}