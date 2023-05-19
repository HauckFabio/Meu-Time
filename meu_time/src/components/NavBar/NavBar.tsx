import 'bootstrap/dist/css/bootstrap.min.css';
import { cleanup } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthService from '../../../src/services/Auth';
import Cookies from 'universal-cookie';

function NavBar() {

	const navigate = useNavigate();
	const location = useLocation();

	const cookies = new Cookies();

	useEffect(() => {
		cleanup();

		const subscription = AuthService.observable.onToken().subscribe((token: any) => {
		if(token)
		{
			navigate('/');		
		}
		else
		{
			navigate('/');
		}
		});
		return subscription.unsubscribe;
	  }, []);

	const clickBar = () => {

	AuthService.logout();
		navigate('/login');
	}
	{console.log(AuthService.getToken())}
 if(AuthService.getToken() !== undefined)
 {
	return (
		<>
		 <div className="d-none d-xs-none d-sm-none d-md-none d-lg-inline-block d-xl-inline-block " style={{  minWidth: '100%' }}>
		 <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid text-white justify-content-center">
			
				<h3>BEM VINDO AO MEU TIME</h3>
			</div>
			<div className="container-fluid text-white justify-content-end">
			<a className="btn btn-primary" onClick={ clickBar } style={{  cursor: 'pointer'  }}>
			SAIR
				</a>
			</div>
			</nav>
		  </div>
		 <div className="d-inline-block d-xs-inline-block d-sm-inline-block d-md-inline-block d-lg-none d-xl-none" style={{  minWidth: '100%', display: 'block' }}>
		 <div className="bd-example">
				<nav className="navbar navbar-dark bg-dark">
				<div className="container-fluid text-white">
				<h3>BEM VINDO AO MEU TIME</h3>
				<a className="btn btn-primary" onClick={ clickBar } style={{  cursor: 'pointer'  }}>
				SAIR
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
