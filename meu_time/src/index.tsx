import React, { useEffect, useState  } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './Home';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "universal-cookie";
import NavBar from './components/NavBar/NavBar';
import Auth from './services/Auth';
import Modals from './components/Modal/Modals';
import Loading from '../../meu_time/src/components/Utils/Loading';

const cookies = new Cookies();
const rootElement = document.getElementById('root'); 


  function LoadingBar({ ...rest }) {
  
    const [loading, setLoading] = useState(false);
    const [modalLoadShow, setModalLoadShow] = useState(false);
    
    useEffect(() => {
      // subscribe to home component messages
      const subscription = Loading.onLoading().subscribe((loading: any) => {
        if (loading) {
          // add message to local state if not empty
                setLoading(loading);
                setModalLoadShow(true)
              } else {
                // clear messages when empty message received
                setLoading(false);
                setModalLoadShow(false)
            }
            console.log(subscription);
        });
        // return unsubscribe method to execute when component unmounts
        return subscription.unsubscribe;
    }, []);
    return (
        <>
            
            <Modals
            show={loading}
            size={"1px"}
            fullscreen={false}
            title={
            <>
              <div className='text-center text-white'>
              <small>CARREGANDO</small>
              </div>
            </>
            }
            text={
              <>
              <div className='text-center text-white'>
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden"></span>
                  </div>
                    
              </div>
            </>     
            }
            footer={
              <>
               <div className='text-end end-div mb-2 text-white'>
                <small className='mb-4'>Aguarde...</small>
              </div>    
              </>
            }
            />
            
                
        </>
    )
  }
  if (rootElement !== null) {
  createRoot(rootElement).render(
    <BrowserRouter>
    < LoadingBar/>
      <div className='wrapper'>
        <NavBar/>
        <div className='main'>
          <PrivateRoute />
        </div>
      </div>
    </BrowserRouter>
  );
}

function PrivateRoute() {
  
  const [token, setToken] = useState(null);
  let navigate = useNavigate();

  useEffect(() => { 
  
    const subscription = Auth.observable.onToken().subscribe((token: any) => {
      if(token)
      {
        console.info('Fazendo Login');
        setToken(token);
        navigate('/home');
      }
      if(token === null)
      {
        console.info('Fazendo Logout');
        setToken(null);
        navigate('/login');
      }
    });
    Auth.observable.setToken(Auth.getToken());
    return subscription.unsubscribe;
  }, []);
  
  return (
    <>
     <Routes>
    {token !== null ? (
      <>
     
        <Route path="/login" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Home />} />
      
    </>)
    :
    (<>
      <Route path="/login" element={<App />} />
     <Route path="*" element={<App />} />
    </>)
    }
    </Routes>
  </>
  );
}

reportWebVitals();
