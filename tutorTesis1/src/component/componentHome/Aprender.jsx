/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
//import CursosBD from "C:/Codigo/MCC/TesisAvance/projects/tutorTesis1/mooks/BDpueba.json";

import "./Aprender.css"
import LogoAprender from '../../imagenes/libro.svg'
import { useContext, useEffect, useState } from "react"
import { TemaAprendiendo } from "./componenteAprender/TemaAprendiendo"
import { TemaContext } from "./componenteAprender/TemaContext"
import { LeerBDTemas } from "../../Functions/leerBDTemas"

export function Aprender(){
  const {seleccionTema, setSeleccionTema}=useContext(TemaContext)
  useEffect(() => {

    //00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000/
    //setSeleccionTema(null); // linea comentada miestras programo
    //descomentar para que funcione bien
    //00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000/

  }, []); // Se ejecuta solo una vez cuando el componente se monta

  if(seleccionTema != null){
    return(
      <TemaAprendiendo/>
    )
  }
  return(
    <div className="aprender">
      <VentanaTemas/>
    </div>
  )
}

const VentanaTemas =()=>{
  const [temas, setTemas] = useState([]);
  const obtenerTemas = async () => {
    const leerBD = new LeerBDTemas();
    try {
      const temasObtenidos = await leerBD.obtenerTodosLosTemas();
      setTemas(temasObtenidos); // Actualiza el estado con los temas obtenidos
    } catch (error) {
      console.error("Error al obtener los temas:", error.message);
    }
  };
  useEffect(() => {
    obtenerTemas();
  }, []); // Solo se ejecuta una vez cuando el componente se monta
  return(
    <div className="ventana-temas">
      {temas.map((tema, index) => (
        <Button key={index} numTema={index + 1} nombreTema={tema.nombre} /> // Accede a nombre_tema correctamente
      ))}
        
    </div>
  )
}


const Button =({numTema, nombreTema})=>{
  const {setSeleccionTema} = useContext(TemaContext)
  const clickTemaButton=()=>{
    setSeleccionTema(numTema)
  }

  return(
    <button onClick={clickTemaButton} className="boton-tema">
      <h1 >Tema {numTema}</h1>
      <div className="boton-conenido"> 
        <img src={LogoAprender} alt="" />
        <p>{nombreTema}</p>
      </div>
    </button>
  )
}
