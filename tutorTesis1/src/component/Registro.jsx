/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import "./Registro.css"
import "./FormularioRegistro.css"; // 👈 Import del CSS
import { LeerBDUsuario } from '../Functions/leerBDUsuario';

const leerBDUsuario = new LeerBDUsuario(); // Instancia de la clase
export function FormularioLogin  ({ onLogin }){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();            
    onLogin(username, password);   
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
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
    </form>
  );
};

export function Registro() {
  return (
    <div className="registro">
      <FormularioRegistro />
    </div>
  );
};


export function FormularioRegistro() {

  const [formData, setFormData] = useState({
    nombre: "",
    usuario: "",
    correo: "",
    contrasena: "",
    confirmar_contrasena: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");  


  // 1. Función de validación de contraseña
  const validarContrasena = (pwd) => {
    const minLength = 8;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    const errores = [];
    if (pwd.length < minLength) errores.push(`Debe tener al menos ${minLength} caracteres.`);
    if (!hasUpper) errores.push("Debe incluir al menos una letra mayúscula.");
    if (!hasLower) errores.push("Debe incluir al menos una letra minúscula.");
    if (!hasNumber) errores.push("Debe incluir al menos un número.");
    if (!hasSpecial) errores.push("Debe incluir al menos un carácter especial.");
    return errores;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validar contraseña en tiempo real
    if (name === "contrasena") {
      setPasswordError(validarContrasena(value));
      // Si ya hay confirmación, validar también coincidencia
      if (formData.confirmar_contrasena.length > 0) {
        setConfirmError(value === formData.confirmar_contrasena ? "" : "Las contraseñas no coinciden.");
      }
    }
    // Validar confirmación en tiempo real
    if (name === "confirmar_contrasena") {
      setConfirmError(value === formData.contrasena ? "" : "Las contraseñas no coinciden.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar contraseña
    const errores = validarContrasena(formData.contrasena);
    if (errores.length > 0) {
      setPasswordError(errores);
      return;
    }

    // Validar coincidencia de contraseñas
    if (formData.contrasena !== formData.confirmar_contrasena) {
      setConfirmError("Las contraseñas no coinciden.");
      return;
    } else {
      setConfirmError("");
    }

    try {
      const resultado = await LeerBDUsuario.crearUsuario(formData);
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
      {/* 3. Mostrar error de validación*/ }
      {passwordError && passwordError.length > 0 && (
        <ul className="error" style={{ margin: 0, paddingLeft: 20 }}>
          {passwordError.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      )}

      <label htmlFor="confirmar_contrasena">Confirmar contraseña</label>
      <input
        type="password"
        id="confirmar_contrasena"
        name="confirmar_contrasena"
        placeholder="Confirmar contraseña"
        value={formData.confirmar_contrasena}
        onChange={handleChange}
        required
      />
      {confirmError && (
        <p className="error" style={{ color: 'red', margin: 0 }}>{confirmError}</p>
      )}

      {/* Deshabilitar si hay error */}
      <button type="submit" disabled={(passwordError && passwordError.length > 0) || !!confirmError}>
        Registrarse
      </button>
    </form>
  );
}