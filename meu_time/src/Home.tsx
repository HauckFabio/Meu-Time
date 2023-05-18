import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AuthService from './services/Auth';
import HomeService from './services/Home';

import Modals from './components/Modal/Modals';
import Cookies from "universal-cookie";

const cookies = new Cookies();
function Home() {

  const [countries, setCountries] = useState([] as any);
  const [selectedCountrie, setSelectedCountrie] = useState({} as any);
  const [seasons, setSeasons] = useState([] as any);
  const [selectedSeasons, setSelectedSeasons] = useState("");
  const [leagues, setLeagues] = useState([] as any);
  const [selectedLeagues, setSelectedLeagues] = useState({} as any);
  const [flag, setFlag] = useState("");
  const [flagLeagueImg, setFlagLeagueImg] = useState("");
  const [modalError, setModalError] = useState(false);
  const [errorAcesso, setErrorAcesso] = useState("");

  useEffect(() => {
  /*      HomeService.countries().then((r) => {
        setCountries(r.data.response);

        HomeService.seasons().then((response) => {
         setSeasons(response.data.response); 
       });
       }); 
  */
      }, []);
  
    const handleLiga = (e: React.ChangeEvent<HTMLSelectElement>) => {

      setSelectedLeagues(e.target.value);
      const selectedValue = e.target.value; 
   
      const selectedObj = leagues.find((val: any) => val.league.id+"" === selectedValue);

        if (selectedObj) {

          
           setSelectedLeagues(selectedObj.league.id); 
           setFlagLeagueImg(selectedObj.league.logo)
        }
    }

    const handleTemporada = (e : any) => {
      setSelectedSeasons(e.target.value);

      if(e.target.value !== "" && selectedCountrie !== "")
      {
        HomeService.leagues(selectedCountrie, e.target.value).then((r) => {
         
         setLeagues(r.data.response); 
         console.log(r.data.response[0].league);
       });
      }
    }

    const handleNação = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value; 
      const selectedObj = countries.find((val: any) => val.code === selectedValue);

  if (selectedObj) {

    const code = selectedObj.code;
    const flag = selectedObj.flag;
    
      setSelectedCountrie(code);
      setFlag(flag);
    }
  }
   
    const FlagImg = () => {
  
      let img = "";
      if(flag === "")
      {
         img = "logoFutebol.png";
      }
      else
      {
         img = flag;
      }

      console.log(flag);
     return(
      <>
       <img src={img} className="img-fluid rounded-circle mb-2 mt-4" width={228} height={228} /><br></br>
      </>
     );
    }
   
    const FlagLeague = () => {
      
      let img = flagLeagueImg;
  
      if(img !== "")
      {

        return(
         <>
       
          <img src={img} className="img-fluid rounded-circle mb-2 mt-4" width={228} height={228} /><br></br>
          
         </> 
         
        );
      }
      else{
        return (<></>);
      }
      
    }
    const clickTimes = () => {

    }

  return (
    <div className="App">

      <header className="App-header">
        <FlagImg/>
        <div className='col-12'>
          <label>Escolha uma Nação</label>
        
        <select className="form-control mb-3 text-center mx-auto w-75" value={selectedCountrie} onChange={(e) => handleNação(e)}>
          <option value="" defaultChecked>Selecione uma Nação</option>
          {countries.length > 0 && countries.map((val: any, i: any) => (
            <option key={i} id={val.flag} value={val.code}>{val.name}</option>
          ))}
        </select>
          
          <label className='col-12'>Escolha uma Temporada</label>
        <select className="form-control mb-3 text-center mx-auto w-75" value={selectedSeasons} onChange={(e) => handleTemporada(e)}>
          <option value="" defaultChecked>Selecione uma Temporada </option>
          {seasons.length > 0 && seasons.map((val : any, i : any) => (
            <option key={i} id={i} value={val} >{val}</option>
          ))}
        </select>
        {leagues.length > 0 && 
        <>
        { selectedLeagues !== "" && selectedCountrie !== "" && selectedSeasons !== "" && <FlagLeague/> }
          <label className='col-12'>Escolha uma Liga</label>
        <select className="form-control mb-3 text-center mx-auto w-75" value={selectedLeagues} onChange={(e) => handleLiga(e)}>
          <option value="" >Selecione uma Liga </option>
          {leagues.length > 0 && leagues.map((val : any, i : any) => (
            <option key={i} id={val.league.id} value={val.league.id} >{val.league.name}</option>
          ))}
        </select>
        <button type="button" onClick={() => clickTimes} className="btn btn-primary">
              Buscar Times
        </button>
        </>
        }

        </div>
      </header>
    </div>
  );
}

export default Home;
