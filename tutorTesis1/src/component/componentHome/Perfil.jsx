/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import { useUsuario } from "./componenteAprender/usuarioContext";
import { LeerBDUsuario } from "../../Functions/leerBDUsuario";
import imgPerfil from '../../imagenes/fotoPerfil.jpg'
import "./Perfil.css"
export function Perfil() {
  const [usuario, setUsuario] = useState(null); // Estado inicial vacío
  const { idUsuario } = useUsuario(); // Obtiene el ID del usuario del contexto
  const leerUsuario = new LeerBDUsuario();
  console.log("el usuaridel context: "+ idUsuario)
  // Efecto para cargar los datos del usuario
  useEffect(() => {
    const fetchUsuario = async () => {
      const datosUsuario = await leerUsuario.devolverUsuariosById({idUsuario}); // Llamada a la función asíncrona
      console.log(datosUsuario)
      setUsuario(datosUsuario); // Actualiza el estado con los datos del usuario
    };

    fetchUsuario(); // Ejecuta la función al montar el componente
  }, [idUsuario]); // Solo se ejecuta cuando `idUsuario` cambia

  return (
    <div className="ventana-perfil">
      <h1>Detalles de Perfil </h1>
      {usuario ? ( // Condicional para evitar errores antes de cargar los datos
        <>
          <img src={imgPerfil}></img>
          <h2>Nombre: {usuario.nombre}</h2>
          <h2>Usuario: {usuario.user}</h2>
        </>
      ) : (
        <p>Cargando información del usuario...</p>
      )}
    </div>
  );
}