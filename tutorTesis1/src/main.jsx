import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { UsuarioProvider } from './component/componentHome/componenteAprender/usuarioContext';
import App from './App';

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <UsuarioProvider>
    <Router>
      <App />
    </Router>
  </UsuarioProvider>,
  document.getElementById('root')
);