/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import "./Registro.css"
import "./FormularioRegistro.css"; // 👈 Import del CSS
import { LeerBDUsuario } from '../Functions/leerBDUsuario';
const leerBDUsuario = new LeerBDUsuario(); // Instancia de la clase
export function FormularioLogin  ({ onLogin }){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = () => {
    onLogin(username, password); // 
  };

  return (
    <div className="login">
      <h1>Ingresar</h1>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Iniciar Sesión</button>
    </div>
  );
};

export function Registro() {
  return (
    <div className="registro">
      <FormularioRegistro />
    </div>
  );
}


export function FormularioRegistro() {
  
  const [formData, setFormData] = useState({
    nombre: "",
    usuario: "",
    correo: "",
    contrasena: "",
  });

   const handleLogin = async (nombre, usuario, correo, contrasena) => {
    // Simula autenticación
    
    const resultado = await LeerBDUsuario.crearUsuario({nombre, usuario, correo, contrasena})
    if (resultado.success) {


      navigate('/'); // Navegar a la página principal
    } else {
      alert('Credenciales incorrectas');
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita recargar la página

    try {
      // Llamar a la función para crear el usuario
      const resultado = await leerBDUsuario.crearUsuario(formData);
      if (resultado.success) {
        alert("Usuario creado exitosamente.");
      } else {
        alert("Error al crear el usuario: " + resultado.message);
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Ocurrió un error al registrar el usuario.");
    }
  };

  return (
    <form className="form-registro" onSubmit={handleSubmit}>
      <h2>Formulario de Registro</h2>

      <label htmlFor="nombre">Nombre</label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        placeholder="Escribe tu nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />

      <label htmlFor="usuario">Usuario</label>
      <input
        type="text"
        id="usuario"
        name="usuario"
        placeholder="Nombre de usuario"
        value={formData.usuario}
        onChange={handleChange}
        required
      />

      <label htmlFor="correo">Correo electrónico</label>
      <input
        type="email"
        id="correo"
        name="correo"
        placeholder="ejemplo@correo.com"
        value={formData.correo}
        onChange={handleChange}
        required
      />

      <label htmlFor="contrasena">Contraseña</label>
      <input
        type="password"
        id="contrasena"
        name="contrasena"
        placeholder="Contraseña segura"
        value={formData.contrasena}
        onChange={handleChange}
        required
      />

      <button type="submit" onClick={handleSubmit}>Registrarse</button>
    </form>
  );
}

  