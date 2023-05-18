import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthService from '../../../src/services/Auth';
import Cookies from 'universal-cookie';

function NavBar() {

	const navigate = useNavigate();
	const location = useLocation();

	const cookies = new Cookies();
	const clickBar = () => {

	AuthService.logout();
		navigate('/login');
	}

 if( location.pathname !== "/login")
 {
	return (
		<>
		 <div className="d-none d-xs-none d-sm-none d-md-none d-lg-inline-block d-xl-inline-block " style={{  minWidth: '100%' }}>
		 <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid text-white justify-content-center">
			
				<h3>MEU TIME</h3>
			</div>
			<div className="container-fluid text-white justify-content-end">
			<a className="link" onClick={ clickBar } style={{  cursor: 'pointer'  }}>
				Sair
				</a>
			</div>
			</nav>
		  </div>
		 <div className="d-inline-block d-xs-inline-block d-sm-inline-block d-md-inline-block d-lg-none d-xl-none" style={{  minWidth: '100%', display: 'block' }}>
		 <div className="bd-example">
				<nav className="navbar navbar-dark bg-dark">
				<div className="container-fluid text-white">
				<h3>MEU TIME</h3>
				<a className="link" onClick={ clickBar } style={{  cursor: 'pointer'  }}>
				Sair
				</a>
				</div>
				</nav>
				</div>
	
		  </div>
		</>
	  )
 }
 else
 {
	return (
		<>
		</>
	)
 }
  
}
export default NavBar;
