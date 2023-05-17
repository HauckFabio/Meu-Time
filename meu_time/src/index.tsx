import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const AuthContext = React.createContext(null);

function PrivateRoute()
{
  
  
  useEffect(() => { 
    
    
  }, []);
  
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<App />} />
      </Routes>
    </>
  );
  
  
}

ReactDOM.render(
  <>
  <BrowserRouter>
    <div className='wrapper' >
        <div className='main' >
          <PrivateRoute />
        </div>
    </div>
  </BrowserRouter>
  </>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
