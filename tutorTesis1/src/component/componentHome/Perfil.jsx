/* eslint-disable react/react-in-jsx-scope */
import { useUsuario } from "./componenteAprender/usuarioContext"
export function Perfil(){
  const { idUsuario, setIdUsuario } = useUsuario();

  return(
    <div>
      <h1>Estoy en la ventana perfil</h1>
      <p>el usuario es {idUsuario}</p>
    </div>
        
  )
}