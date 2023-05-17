import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='*' element={<App />} />
      </Routes>
    </>
  );
}

reportWebVitals();
