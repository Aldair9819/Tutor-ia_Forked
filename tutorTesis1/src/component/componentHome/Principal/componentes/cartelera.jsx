/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import "./cartelera.css";
import temasData from "./temas.json";
import img1 from "../imagenescartelera/1.jpg";
import img2 from "../imagenescartelera/2.jpg";


const imagenes = [img1, img2];

export function Cartelera() {
  const totalImagenes = 2; // Número total de imágenes en la carpeta
  const [indiceImagen, setIndiceImagen] = useState(1); // Índice de la imagen actual (empieza en 1)

  // Función para cambiar a la imagen anterior
  const clicIzq = () => {
    setIndiceImagen((prevIndice) => (prevIndice === 1 ? totalImagenes : prevIndice - 1));
  };

  // Función para cambiar a la imagen siguiente
  const clicDer = () => {
    setIndiceImagen((prevIndice) => (prevIndice === totalImagenes ? 1 : prevIndice + 1));
  };

  // Selección de la imagen actual usando el índice
  const rutaImagen = imagenes[indiceImagen - 1]; // Ajustamos el índice porque empieza en 1

  return (
    <div className="cartelera">
      <div className="imagen-container">
        <img src={rutaImagen} alt={`Imagen ${indiceImagen}`} className="imagenl" />
      </div>
      <div className="banner">
        <p>{temasData.descriptions[indiceImagen]}</p>
      </div>
      <button className="move-button left" onClick={clicIzq}>
        🡰
      </button>
      <button className="move-button right" onClick={clicDer}>
        🡲
      </button>
    </div>
  );
}
