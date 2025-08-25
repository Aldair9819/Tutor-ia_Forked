/* eslint-disable react/prop-types */
// Home.js
import React, { useState } from 'react';
import Logo from '../imagenes/Logo.svg'
import "./Home.css"
import { Aprender } from './componentHome/Aprender';
import { Principal } from './componentHome/Principal';
import { Informacion } from './componentHome/Informacion';
import { Perfil } from './componentHome/Perfil';
import { Calificacion } from './componentHome/Calificacion';
import LogoAprender from '../imagenes/libro.svg'
import LogoCalificacion from '../imagenes/calificacion.svg'
import LogoInformacion from '../imagenes/informacion.svg'
import LogoPerfil from '../imagenes/perfil.svg'
import LogoPrincipal from '../imagenes/principal.svg'
import { TemaProvider } from './componentHome/componenteAprender/TemaContext';
import { useNavigate } from 'react-router-dom';

const Header =({setMenu, menuDisplay})=>{
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
        <button onClick={clickButonCerrarSecion}>Cerrar Sesión</button>
      </div>
      

    </div>
  )
}


function Menu ({menuDisplay, setVentanaDisplay, setMenu,  setResetKey}){
  const clickHome=()=>{
    setVentanaDisplay("principal")
    setMenu(false)
  }
  const clickAprender=()=>{
    setResetKey(prevKey => prevKey + 1);
    setVentanaDisplay("aprender")
    setMenu(false)
  }
  const clickCalificacion =()=>{
    setVentanaDisplay("calificacion")
    setMenu(false)
  }
  const clickInformacion=()=>{
    setVentanaDisplay("informacion")
    setMenu(false)
  }
  const clickPerfil=()=>{
    setVentanaDisplay("perfil")
    setMenu(false)
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
  const [menuDisplay, setMeunDisplay] = useState(true)
  const [ventanaDisplay, setVentanaDisplay] = useState("principal")
  const [resetKey, setResetKey] = useState(0);
  const renderVentana = () => {
    switch (ventanaDisplay) {
    case "principal":
      return <Principal />;
    case "aprender":
      return(
        <TemaProvider>
          <Aprender key={`aprender_${resetKey}`}/>
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
        <Menu menuDisplay={menuDisplay} setVentanaDisplay={setVentanaDisplay} setResetKey={setResetKey} setMenu={setMeunDisplay}/>
        <div className='ventanaHome'>
          {renderVentana()}
        </div>
      </div>

    </div>
  );
}

export default Home;