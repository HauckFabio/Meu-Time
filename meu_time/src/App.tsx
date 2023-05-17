import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div className="mb-3">
      <label htmlFor="apiToken" className="form-label">
        Informe o 'API Token' para acessar o sistema: 
      </label>
      <input type="text" className="form-control" id="apiToken" />
    </div>
    <button type="button" className="btn btn-primary">
      Enviar
    </button>
      </header>
    </div>
  );
}

export default App;
