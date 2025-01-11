import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate  } from 'react-router-dom';
import Login from './component/Login';
import Home from './component/Home';

import * as jwtDecode from 'jwt-decode';





function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Hook para redirigir programáticamente
  console.log("autentificacion =" + isAuthenticated)
  useEffect(() => {
    // Verificar si el token existe en localStorage
    const token = localStorage.getItem('token');
    console.log("el token es:" + token)
    if (token) {
      setIsAuthenticated(true);
      navigate("/home"); // Redirigir directamente si está autenticado
    } else {
      navigate("/login"); // Redirigir a login si no está autenticado
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route
        path="/home"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
