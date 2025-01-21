// Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../imagenes/Logo.svg'
import imgSecion from '../../imagenes/imgInicioSecion.webp';
import "./Login.css";
import { Registro } from './Registro';
import { FormularioLogin } from './Registro';
import { useUsuario } from './componentHome/componenteAprender/usuarioContext';
import { LeerBDUsuario } from '../Functions/leerBDUsuario';
function Login({ setIsAuthenticated }) { //home de la pagina
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const bdUsuario = new LeerBDUsuario()

  // Acceso al contexto
  const { setIdUsuario } = useUsuario();
  const showModalIncio=()=>{
    setModalContent(<FormularioLogin onLogin={handleLogin}/>)
    console.log("desplegando modal inicio.....")
    console.log(bdUsuario.devolverUsuarios())
    setModalVisible(true)    
  }
  const showModalRegistro=()=>{
    setModalContent(<Registro/>)
    setModalVisible(true)
  }
  const closeModal=()=>{
    setModalVisible(false)
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home', { replace: true }); // Reemplaza la entrada en el historial
    }
  }, [navigate]);

  const handleLogin = async (usuario, contrasena) => {
    // Simula autenticación
    
    const resultado = await bdUsuario.validarUsuarioyContraseña({usuario,contrasena})
    if (resultado.success) {
      setIdUsuario(resultado.data.idUsuario)
      setIsAuthenticated(true);
      localStorage.setItem('token', resultado.data.token);
      localStorage.setItem('idUsuario', resultado.data.idUsuario);

      navigate('/home'); // Navegar a la página principal
    } else {
      alert('Credenciales incorrectas');
    }
  };


  return (
    <div className='login-page' >
      <header className="header">
        <img src={Logo} alt="Logo" />
      </header>
      <div className='login-form'>
        <img src={imgSecion} alt="" />
        <div className='conetenido-principal'>
          <h2>¡Aprende matematicas de manera inteligente! Al lado de tu profesor I.A.</h2>
          <Identificarte 
            showModalIncio={showModalIncio}
            showModalRegistro={showModalRegistro}
          />
        </div>
      </div>
      {modalVisible && (
        <Modal onClose={closeModal}>
          {modalContent}
        </Modal>
      )}
    </div>
  );
}

const Identificarte = ({showModalIncio, showModalRegistro})=>{
  
 
  return(
    <>
      <button onClick={showModalRegistro}>Registrate </button>
      <button onClick={showModalIncio}>Ya tengo una cuenta</button>
    </>
  )
} 


const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">X</button>
        {children}
      </div>
    </div>
  );
};









export default Login;