// Home.js
import React, { useState } from 'react';
import Logo from '../../imagenes/Logo.svg'
import "./Home.css"
import { Aprender } from './componentHome/Aprender';
import { Principal } from './componentHome/Principal';
import { Informacion } from './componentHome/Informacion';
import { Perfil } from './componentHome/Perfil';
import { Calificacion } from './componentHome/Calificacion';
import LogoAprender from '../../imagenes/libro.svg'
import LogoCalificacion from '../../imagenes/calificacion.svg'
import LogoInformacion from '../../imagenes/informacion.svg'
import LogoPerfil from '../../imagenes/perfil.svg'
import LogoPrincipal from '../../imagenes/principal.svg'
import { TemaProvider } from './componentHome/componenteAprender/TemaContext';
import { useNavigate } from 'react-router-dom';
import { useUsuario } from './componentHome/componenteAprender/usuarioContext';
const Header =({setMenu, menuDisplay})=>{
  const { idUsuario, setIdUsuario } = useUsuario();
  console.log("el id es en home" + idUsuario)
  const navigate = useNavigate();
  const clickButonMenu =()=> {
    setMenu(!menuDisplay)

  }

  const clickButonCerrarSecion =()=>{
    localStorage.removeItem('token'); // Borra el token
    navigate('/login'); // Redirige a login sin recargar la página
  }
  return(
    <div className='Header'>
      <div className='caja-menu'>
        <button className='menu-button' onClick={clickButonMenu}>
          <i className="fas fa-bars"></i> {/* Ícono de hamburguesa */}
        </button>
        <img src={Logo} alt="" />
      </div>
      <div className='caja-botones'>
        <button>Usuario</button>
        <button onClick={clickButonCerrarSecion}>Cerrar Seción</button>
      </div>
      

    </div>
  )
}


function Menu ({menuDisplay, setVentanaDisplay}){
  const clickHome=()=>{
    setVentanaDisplay("principal")
  }
  const clickAprender=()=>{
    setVentanaDisplay("aprender")
  }
  const clickCalificacion =()=>{
    setVentanaDisplay("calificacion")
  }
  const clickInformacion=()=>{
    setVentanaDisplay("informacion")
  }
  const clickPerfil=()=>{
    setVentanaDisplay("perfil")
  }
  return(
    menuDisplay &&(
      <aside className='menu'>
        <h1>Menu</h1>
        <button onClick={clickHome}> <img src={LogoPrincipal} alt="Icono" style={{ width: '35px', height: '35px' }}/>Home</button>
        <button onClick={clickAprender}> <img src={LogoAprender} alt="Icono" style={{ width: '35px', height: '35px' }}/>Aprender</button>
        <button onClick={clickCalificacion}> <img src={LogoCalificacion} alt="Icono" style={{ width: '35px', height: '35px' }}/>Calificaciones</button>
        <button onClick={clickInformacion}> <img src={LogoInformacion} alt="Icono" style={{ width: '35px', height: '35px' }}/>Acerca de la App</button>
        <button onClick={clickPerfil}> <img src={LogoPerfil} alt="Icono" style={{ width: '35px', height: '35px' }}/>Perfil</button>
      </aside>
    )
  )
}

function Home() {
  const [menuDisplay, setMeunDisplay] = useState(false)
  const [ventanaDisplay, setVentanaDisplay] = useState("principal")

  const renderVentana = () => {
    switch (ventanaDisplay) {
    case "principal":
      return <Principal />;
    case "aprender":
      return(
        <TemaProvider>
          <Aprender />
        </TemaProvider>
      );
    case "calificacion":
      return <Calificacion />;
    case "informacion":
      return <Informacion />;
    case "perfil":
      return <Perfil />;
    default:
      return <Principal />; // Valor por defecto
    }
  };
  return (
    <div className='home-page'>
      <Header setMenu={setMeunDisplay} menuDisplay={menuDisplay}/>
      <div className={`ventana ${menuDisplay?"with-menu":""}`}>
        <Menu menuDisplay={menuDisplay} setVentanaDisplay={setVentanaDisplay}/>
        <div className='ventanaHome'>
          {renderVentana()}
        </div>
      </div>

    </div>
  );
}

export default Home;