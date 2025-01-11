import React, { createContext, useContext, useState} from "react";

//creo el contexto
export const TemaContext = createContext()

//proveer el contexto
export const TemaProvider =({children})=>{
  const[seleccionTema, setSeleccionTema] =useState(null)

  return(
    <TemaContext.Provider value={{seleccionTema,setSeleccionTema}}>
      {children}
    </TemaContext.Provider>
  )
}

