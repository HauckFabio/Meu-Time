import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './Home';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "universal-cookie";

const cookies = new Cookies();
const rootElement = document.getElementById('root');

if (rootElement !== null) {
  createRoot(rootElement).render(
    <BrowserRouter>
      <div className='wrapper'>
        <div className='main'>
          <PrivateRoute />
        </div>
      </div>
    </BrowserRouter>
  );
}

function PrivateRoute() {
  useEffect(() => {}, []);

  return (
    <>
        {cookies.get('token') !== undefined ?
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<Home />} />
      </Routes>
        :
        <Routes>
        <Route path='/' element={<App />} />
        <Route path='*' element={<App />} />
        </Routes>
        }
    </>
  );
}

reportWebVitals();
