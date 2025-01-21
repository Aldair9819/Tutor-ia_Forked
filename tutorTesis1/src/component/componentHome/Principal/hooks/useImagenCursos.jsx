import { useState } from "react"
import imgCurso from "../mooks/imgCurso.json" 

export function useImagenCursos(){
  const [imagen, setImagen]=useState(null)
  const [imagenesCursoActual , setImgCursoActual] = useState(imgCurso)
  const getImagenCursos=(num)=>{

    const imagenResultado = imagenesCursoActual.results[num]
                  
    if (imagenResultado) {
      const raw = imagenResultado.urls.raw; // Obtener la URL 'thumb'
      console.log(raw)
      setImagen(raw); // Asignar el valor de thumb al estado imagen
    } else {
      console.log("No se encontró imagen para el query:", num);
    }
  }    
  const getTema = (nuevoTema, numTema) => { // Añadir numTema como argumento
    if (nuevoTema && nuevoTema.results) {
      setImgCursoActual(nuevoTema);
      const imagenResultado = nuevoTema.results[numTema]; // Usar numTema aquí
            
      if (imagenResultado) {
        const raw = imagenResultado.urls.raw; // Obtener la URL 'raw'
        console.log(raw);
        setImagen(raw); // Asignar el valor de raw al estado imagen
      } else {
        console.log("No se encontró imagen para el query:", numTema);
      }
    }
  };
  return {imagen, getImagenCursos, getTema, imagenesCursoActual}
}
export default useImagenCursos;