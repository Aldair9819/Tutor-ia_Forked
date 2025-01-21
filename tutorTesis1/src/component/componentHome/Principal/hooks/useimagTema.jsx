import { useState } from "react"
import temas from "../componentes/temas.json"

export function useImagTema (){
  const [resultadoImagenes, setImagenes]=useState(null)
    
  const APIKEY = "i7VqQLR2Lb0b-77QboXVmH4My0yBdKAGwYubAXv_IpM"
  const getImagenesTema=(num)=>{
    console.log("el num del tema es ", num)
    const query = temas.temas[num]
    console.log("la api es",`https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${APIKEY}`)
        
    if(query){
      fetch( `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${APIKEY}`)
        .then(res => res.json())
        .then(json =>{
          setImagenes(json)
        })
    }else{
      console.log("no se encontro imagen")
      setImagenes(null)
    }
        
  }    
  return {resultadoImagenes, getImagenesTema}
}