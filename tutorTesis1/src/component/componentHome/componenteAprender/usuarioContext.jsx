import React, { createContext, useContext, useState } from "react";

// Crear contexto
export const UsuarioContext = createContext();

// Proveedor del contexto
export const UsuarioProvider = ({ children }) => {
  const [idUsuario, setIdUsuario] = useState(null);

  return (
    <UsuarioContext.Provider value={{ idUsuario, setIdUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useUsuario = () => {
  const context = useContext(UsuarioContext);
  if (!context) {
    throw new Error("useUsuario debe usarse dentro de un UsuarioProvider");
  }
  return context;
};