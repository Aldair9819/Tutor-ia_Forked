/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import "./Registro.css"
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

export function Registro (){
  return (
    <div className="registro">
      <h2>Registrarse</h2>
      {/* Formulario de registro aquí */}
      <p>Formulario de registro (en construcción)</p>
    </div>
  );
};
  