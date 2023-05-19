import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import '../css/App.css';
import AuthService from '../services/Auth';
import HomeService from '../services/Home';
import Datatable from '../components/Datatable/Datatable';
import Modals from '../components/Modal/Modals';
import Cookies from "universal-cookie";
import Dashboard from '../components/Dashboard/Dashboard';

const cookies = new Cookies();
function Home() {

  const [countries, setCountries] = useState([] as any);
  const [selectedCountrie, setSelectedCountrie] = useState({} as any);
  const [selectedCountrieName, setSelectedCountrieName] = useState("");
  const [seasons, setSeasons] = useState([] as any);
  const [selectedSeasons, setSelectedSeasons] = useState("");
  const [leagues, setLeagues] = useState([] as any);
  const [selectedLeagues, setSelectedLeagues] = useState("" as any);
  const [selectedTeamPlayers, setSelectedTeamPlayers] = useState("" as any);
  const [selectedTeamPlayed, setSelectedTeamPlayed] = useState("" as any);
  const [selectedTeamGols, setSelectedTeamGols] = useState("" as any);
  const [teams, setTeams] = useState([] as any);
  const [selectedTeams, setSelectedTeams] = useState("");
  const [selectedTeamFormation, setSelectedTeamFormation] = useState("");
  const [flag, setFlag] = useState("");
  const [flagLeagueImg, setFlagLeagueImg] = useState("");
  const [flagTeamImg, setFlagTeamImg] = useState("");
  const [modalError, setModalError] = useState(false);
  const [controlTeam, setControlTeam] = useState(false);
  const [errorAcesso, setErrorAcesso] = useState("");

  useEffect(() => {
       HomeService.countries().then((r) => {
        setCountries(r.data.response);

        HomeService.seasons().then((response) => {
         setSeasons(response.data.response); 
       });
       }); 
  
      }, []);
  
    const handleTeam = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedTeams(e.target.value);
      const selectedValue = e.target.value; 
   
      const selectedObj = teams.find((val: any) => val.team.id+"" === selectedValue);

        if (selectedObj) {
          
          setSelectedTeams(selectedObj.team.id); 
          HomeService.statisticsTeam(selectedObj.team.id,selectedSeasons, selectedLeagues).then((r) => {
     
            const data = {
              "0-15": {
                total: r.data.response.goals.for.minute['0-15'].total !== null ? r.data.response.goals.for.minute['0-15'].total : 0,
                percentage: r.data.response.goals.for.minute['0-15'].percentage !== null ? r.data.response.goals.for.minute['0-15'].percentage : 0,
              },
              "16-30": {
                total: r.data.response.goals.for.minute['16-30'].total !== null ? r.data.response.goals.for.minute['16-30'].total : 0,
                percentage: r.data.response.goals.for.minute['16-30'].percentage !== null ? r.data.response.goals.for.minute['16-30'].percentage : 0,
              },
              "31-45": {
                total: r.data.response.goals.for.minute['31-45'].total !== null ? r.data.response.goals.for.minute['31-45'].total : 0,
                percentage: r.data.response.goals.for.minute['31-45'].percentage !== null ? r.data.response.goals.for.minute['31-45'].percentage : 0,
              },
              "46-60": {
                total: r.data.response.goals.for.minute['46-60'].total !== null ? r.data.response.goals.for.minute['46-60'].total : 0,
                percentage: r.data.response.goals.for.minute['46-60'].percentage !== null ? r.data.response.goals.for.minute['46-60'].percentage : 0,
              },
              "61-75": {
                total: r.data.response.goals.for.minute['61-75'].total !== null ? r.data.response.goals.for.minute['61-75'].total : 0,
                percentage: r.data.response.goals.for.minute['61-75'].percentage !== null ? r.data.response.goals.for.minute['61-75'].percentage : 0,
              },
              "76-90": {
                total: r.data.response.goals.for.minute['76-90'].total !== null ? r.data.response.goals.for.minute['76-90'].total : 0,
                percentage: r.data.response.goals.for.minute['76-90'].percentage !== null ? r.data.response.goals.for.minute['76-90'].percentage : 0,
              },
              "91-105": {
                total: r.data.response.goals.for.minute['91-105'].total !== null ? r.data.response.goals.for.minute['91-105'].total : 0,
                percentage: r.data.response.goals.for.minute['91-105'].percentage !== null ? r.data.response.goals.for.minute['91-105'].percentage : 0,
              },
              "106-120": {
                total: r.data.response.goals.for.minute['106-120'].total !== null ? r.data.response.goals.for.minute['106-120'].total : 0,
                percentage: r.data.response.goals.for.minute['106-120'].percentage !== null ? r.data.response.goals.for.minute['106-120'].percentage : 0,
              },
            }
            setSelectedTeamGols(data);
       
              setSelectedTeamPlayed(r.data.response.fixtures);

           
            if(r.data.response.lineups.length > 0)
            {
              setSelectedTeamFormation(r.data.response.lineups[0].formation);
            }
            else
            {
              
              setSelectedTeamFormation("não Cadastrado!");
            }
          /*   if(r.data.response.goals['minute']) */
            HomeService.players(selectedObj.team.id,selectedSeasons, selectedLeagues).then((r) => {
              setSelectedTeamPlayers(r.data.response);
             
           });
         });
          setFlagTeamImg(selectedObj.team.logo)
          setControlTeam(true);
        }

    }

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
       });
      }
    }
    
    const handleNação = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value; 
      const selectedObj = countries.find((val: any) => val.code === selectedValue);

  if (selectedObj) {

    const code = selectedObj.code;
    const flag = selectedObj.flag;
    const name = selectedObj.name;
    setSelectedCountrieName(name);
      setSelectedCountrie(code);
      setFlag(flag);
    }
  }
   
    const RowTeam = () => {

      let lineups = selectedTeamFormation;
      if(selectedTeams !== "" && selectedTeamPlayed !== "")
      {
        
        const selectedObj = teams.find((val: any) => val.team.id === selectedTeams);
        const selectedLeague = leagues.find((val: any) => val.league.id === selectedLeagues);
    
        return(
          <>
    
            <tr className="text-dark" key={selectedObj.team.id} >
  
              <td><p>{selectedObj.team.name}</p></td>
              <td><p>{selectedObj.team.code}</p></td>
              <td><p>{selectedObj.team.founded}</p></td>
              <td><p>{selectedObj.venue.name}</p></td>
              <td><img src={selectedObj.venue.image} className="img-fluid rounded-circle mb-2 mt-4" width={228} height={228} /><br></br></td>
              <td><p>{selectedObj.venue.capacity}</p></td>
              <td><p>{selectedObj.team.country}</p></td>
              <td><p>{selectedObj.venue.city}</p></td>
              <td><p>{selectedObj.venue.address}</p></td>
              <td><p>{selectedLeague.league.name}</p></td>
              <td><p>{selectedSeasons}</p></td>
              <td><p>{lineups}</p></td>
              <td><p>{selectedTeamPlayed.played.total}</p></td>
              <td><p>{selectedTeamPlayed.wins.total}</p></td>
              <td><p>{selectedTeamPlayed.loses.total}</p></td>
              <td><p>{selectedTeamPlayed.draws.total}</p></td>
  
            </tr>
  
  
        </>
        )
      }
      else{
        return(
        <tr className="text-dark" >
  
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
        </tr>)
      }
    }
  
    const RowTeamPlayers = () => {

      if(selectedTeams !== "")
      {
        
        const selectedObj = teams.find((val: any) => val.team.id === selectedTeams);
        const selectedLeague = leagues.find((val: any) => val.league.id === selectedLeagues);

     /* 'NOME DO JOGADOR','NOME CAMISA', 'IDADE','NACIONALIDADE', 'ALTURA', 'IMAGEM' */

  
        return(
          <>
          {selectedTeamPlayers.length > 0 && selectedTeamPlayers.map((val : any, i : any) =>
            <tr className="text-dark" key={i} >
          
  
            <td>{val.player.firstname+ " "+ val.player.lastname}</td>
            <td>{val.player.name}</td>
            <td>{val.player.age}</td>
            <td>{val.player.nationality}</td>
            <td>{val.player.height}</td>
            <td><img src={val.player.photo} className="img-fluid rounded-circle mb-2 mt-4" width={228} height={228} /><br></br></td>
            
         
  
            
          </tr>
          )}
  
        </>
        )
      }
      else{
        return(
        <tr className="text-dark" >
  
              <td></td>
              <td></td>
              <td></td>
     
        </tr>)
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

     return(
      <>
       <img src={img} className="img-fluid rounded-circle mb-2 mt-4" width={228} height={228} /><br></br>
      </>
     );
    }
   
    const FlagTeam = () => {
    
      let img = flagTeamImg;
  
      if(img !== "")
      {

        return(
         <>
       
          <img src={img} className="img-fluid mb-2 mt-4" width={228} height={228} /><br></br>
          
         </> 
         
        );
      }
      else{
        return (<></>);
      }
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
    const clickReset = () => {
      cookies.set("countrieCode", "" );
      cookies.set("countrieName", "" );
      cookies.set("seasons", "" );
      cookies.set("leagues", "" );
      setSelectedCountrie("");
      setSelectedCountrieName("");
      setSelectedSeasons("");
      setSelectedLeagues("");
      setSelectedTeams("");
      setTeams("");
      setFlagTeamImg("");
      setFlagLeagueImg("");
      setFlag("");
      setControlTeam(false);
    }

    const clickTeams = () => {

      HomeService.teams(selectedCountrieName, selectedSeasons, selectedLeagues).then((r) => {
        cookies.set("countrieCode",selectedCountrie );
        cookies.set("countrieName",selectedCountrieName );
        cookies.set("seasons",selectedSeasons );
        cookies.set("leagues",selectedLeagues );
              //code : any, season : any, league : any
             
              if(r.data.response.length > 0)
              {
                setTeams(r.data.response); 
              }
              else
              {
                setModalError(true);
                setErrorAcesso("Não foi encontrado clubes para as opções informadas!");
              }

      });
    }

  return (
    <div className="App col-12">

      <header className="App-header col-12 col-xs-12">  
    {!(teams.length > 0) &&
    <>
        <FlagImg/>

        <div className='row'>
        <div className='col-xs-12 col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3'/>
        <div className='col-xs-12 col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'>
          <label className='col-xs-12'>ESCOLHA UMA NAÇÃO</label>
        
        <select className="form-control mb-3 text-center mx-auto w-75 select-with-scroll" value={selectedCountrie} onChange={(e) => handleNação(e)}>
          <option value="" defaultChecked>Selecione uma Nação</option>
          {countries.length > 0 && countries.map((val: any, i: any) => (
            <option key={i} id={val.flag} value={val.code}>{val.name}</option>
          ))}
        </select>
          
          <label className='col-xs-12'>ESCOLHA UMA TEMPORADA</label>
          <select className="form-control mb-3 text-center mx-auto w-75 select-with-scroll" value={selectedSeasons} onChange={(e) => handleTemporada(e)}>
          <option value="" defaultChecked>Selecione uma Temporada</option>
          {seasons.length > 0 && seasons.map((val: any, i: any) => (
            <option className='h-50' key={i} id={i} value={val}>{val}</option>
          ))}
        </select>
      
        {leagues.length > 0 && 
        <>
        { selectedLeagues !== "" && selectedCountrie !== "" && selectedSeasons !== "" && <FlagLeague/> }
        
          <label className='col-xs-12'>ESCOLHA UMA LIGA</label>
        <select className="form-control mb-3 text-center mx-auto w-75 select-with-scrol" value={selectedLeagues} onChange={(e) => handleLiga(e)}>
          <option value="" >Selecione uma Liga </option>
          {leagues.length > 0 && leagues.map((val : any, i : any) => (
            <option key={i} id={val.league.id} value={val.league.id} >{val.league.name}</option>
          ))}
        </select>
        <button type="button" onClick={clickTeams} className="btn btn-primary">
              Buscar Times
        </button>
        </>
        }

        </div>
        <div className='col-md-3 col-lg-3 col-xl-3'/>
        </div>
        </>
    }

      { teams.length > 0 && <>
      <FlagTeam/> 
      
          <label className='col-xs-12'>ESCOLHA UMA EQUIPE</label>
        <select className="form-control mb-3 text-center mx-auto w-75 select-with-scroll" value={selectedTeams} onChange={(e) => handleTeam(e)}>
          <option value="" >Selecione uma Equipe </option>
          {teams.length > 0 && teams.map((val : any, i : any) => (
            <option key={i} id={val.team.id} value={val.team.id} >{val.team.name}</option>
          ))}
        </select>
        {selectedTeams !== undefined && <>
      <div className='col-12'>
      <div className='col-1'/>
      <button type="button" onClick={clickReset} className="btn btn-primary mt-2 mb-3">
          VOLTAR
      </button><br></br>
        
      <div className='col-1'/>
        </div>
        </>}
        {controlTeam && 
        <>
        
        {selectedTeams !== undefined &&
        <div className='col-xs-12 mx-auto w-100'>
            <h1 className='col-xs-12'>INFORMAÇÕES DO CLUBE</h1>
         <Datatable estilo="table table-hover table-bordered table-striped"
         header={['CLUBE', 'SIGLA','FUNDADAÇÃO', 'ESTÁDIO','IMAGEM','CAPACIDADE', 'PAÍS', 'ESTADO/CIDADE', 'ENDEREÇO DO ESTÁDIO','LIGA','TEMPORADA', 'FORMAÇÃO MAIS UTILIZADA', 'TOTAL DE JOGOS', 'TOTAL DE VITÓRIAS', 'TOTAL DE DERROTAS', 'TOTAL DE EMPATES']}
         row={
           <>
            <RowTeam/>
           </>
         }
          />
          </div>
        }
        <div className="card-statistic">
        {selectedTeamGols !== undefined && 
          <>
          <div className='col-xs-12 mx-auto w-100'>
        <h1 className="dashboard-title mt-2">ESTÁTISTICAS DO CLUBE</h1>
        <label className='col-xs-12'>ESTÁTISTICAS DE JOGOS</label>
       { <Dashboard data={selectedTeamPlayed}/>}
        <label className='col-xs-12'>ESTÁTISTICAS DE GOLS POR PERÍODO DE JOGO</label>
       { <Dashboard data={selectedTeamGols}/>}
        </div>
          </>
        }
        					
       <h1 className='col-xs-12'>JOGADORES DO CLUBE <br></br> {selectedTeamPlayers.length > 0 ? selectedTeamPlayers.length : 0} CADASTRADOS</h1>
       </div>
        {selectedTeams !== undefined &&
         <div className='col-xs-12 mx-auto w-100 mt-2'>
         <Datatable estilo="table table-hover table-bordered table-striped"
         header={['NOME DO JOGADOR','NOME CAMISA', 'IDADE','NACIONALIDADE', 'ALTURA', 'IMAGEM']}
         row={
           <>
            <RowTeamPlayers/>
           </>
         }
          />
          </div>
        }
		
       </>}
        </>}
    

        <Modals
            show={modalError}
            size={"md"}
            title={''}
            text={
              <div>
                {errorAcesso !== "" &&
                  <div className="alert alert-danger alert-dismissible col-12 col-xs-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" role="alert">
                    <div className='row'>

                      <div className="alert-icon col-2">
                        <svg
                          width="34px"
                          height="34px"
                          viewBox="-6.2 -6.2 32.40 32.40"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#000000"
                          transform="rotate(-45)"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <g id="layer1">
                              {" "}
                              <path
                                d="M 9 1 L 9 2.1054688 L 8.7070312 2.1699219 L 8.2890625 2.3027344 L 7.8867188 2.46875 L 7.5 2.6699219 L 7.1308594 2.9042969 L 6.7851562 3.1699219 L 6.4628906 3.4628906 L 6.1699219 3.7871094 L 5.9023438 4.1328125 L 5.6699219 4.5 L 5.46875 4.8867188 L 5.3007812 5.2890625 L 5.1679688 5.7050781 L 5.0742188 6.1308594 L 5.0175781 6.5644531 L 5 7 L 4.9804688 7.7597656 L 4.9238281 8.5195312 L 4.8261719 9.2753906 L 4.6914062 10.023438 L 4.5195312 10.765625 L 4.3085938 11.498047 L 4.0625 12.216797 L 3.78125 12.923828 L 3.4628906 13.615234 L 3.109375 14.289062 L 2.7226562 14.943359 L 2.3027344 15.580078 L 1.8515625 16.193359 L 1.7832031 16.314453 L 1.75 16.449219 L 1.7539062 16.585938 L 1.7988281 16.720703 L 1.8769531 16.835938 L 1.9824219 16.923828 L 2.109375 16.980469 L 2.2480469 17 L 7.171875 17 L 7.296875 17.302734 L 7.4589844 17.595703 L 7.6542969 17.869141 L 7.8789062 18.121094 L 8.1308594 18.345703 L 8.4042969 18.541016 L 8.6972656 18.701172 L 9.0097656 18.832031 L 9.3320312 18.925781 L 9.6640625 18.980469 L 10 19 L 10.335938 18.980469 L 10.667969 18.925781 L 10.992188 18.832031 L 11.302734 18.701172 L 11.595703 18.541016 L 11.871094 18.345703 L 12.121094 18.121094 L 12.345703 17.869141 L 12.541016 17.595703 L 12.703125 17.302734 L 12.828125 17 L 17.751953 17 L 17.890625 16.980469 L 18.017578 16.923828 L 18.125 16.835938 L 18.203125 16.720703 L 18.246094 16.585938 L 18.25 16.449219 L 18.216797 16.314453 L 18.146484 16.193359 L 17.697266 15.580078 L 17.277344 14.943359 L 16.890625 14.289062 L 16.539062 13.615234 L 16.21875 12.923828 L 15.9375 12.216797 L 15.691406 11.498047 L 15.480469 10.765625 L 15.306641 10.023438 L 15.173828 9.2753906 L 15.076172 8.5195312 L 15.019531 7.7597656 L 15 7 L 14.980469 6.5644531 L 14.923828 6.1308594 L 14.830078 5.7050781 L 14.699219 5.2890625 L 14.53125 4.8867188 L 14.330078 4.5 L 14.095703 4.1328125 L 13.830078 3.7871094 L 13.535156 3.4628906 L 13.214844 3.1699219 L 12.867188 2.9042969 L 12.498047 2.6699219 L 12.111328 2.46875 L 11.708984 2.3027344 L 11.294922 2.1699219 L 11 2.1054688 L 11 1 L 9 1 z M 10 3 L 10.392578 3.0195312 L 10.78125 3.078125 L 11.162109 3.1738281 L 11.53125 3.3046875 L 11.884766 3.4726562 L 12.222656 3.6738281 L 12.539062 3.9082031 L 12.830078 4.171875 L 13.091797 4.4628906 L 13.326172 4.7773438 L 13.529297 5.1132812 L 13.695312 5.46875 L 13.828125 5.8398438 L 13.923828 6.21875 L 13.980469 6.6074219 L 14 7 L 14.017578 7.734375 L 14.068359 8.46875 L 14.152344 9.1992188 L 14.269531 9.9238281 L 14.419922 10.644531 L 14.605469 11.355469 L 14.822266 12.058594 L 15.070312 12.75 L 15.349609 13.429688 L 15.660156 14.095703 L 16.001953 14.748047 L 16.371094 15.382812 L 16.771484 16 L 3.2285156 16 L 3.6269531 15.382812 L 3.9980469 14.748047 L 4.3398438 14.095703 L 4.6503906 13.429688 L 4.9296875 12.75 L 5.1796875 12.058594 L 5.3945312 11.355469 L 5.578125 10.644531 L 5.7304688 9.9238281 L 5.8496094 9.1992188 L 5.9316406 8.46875 L 5.984375 7.734375 L 6 7 L 6.0195312 6.6074219 L 6.078125 6.21875 L 6.171875 5.8398438 L 6.3046875 5.46875 L 6.4707031 5.1132812 L 6.6738281 4.7773438 L 6.9082031 4.4628906 L 7.171875 4.171875 L 7.4628906 3.9082031 L 7.7773438 3.6738281 L 8.1132812 3.4726562 L 8.46875 3.3046875 L 8.8398438 3.1738281 L 9.21875 3.078125 L 9.6074219 3.0195312 L 10 3 z M 8.2714844 17 L 11.728516 17 L 11.708984 17.039062 L 11.552734 17.261719 L 11.365234 17.462891 L 11.152344 17.634766 L 10.919922 17.775391 L 10.669922 17.884766 L 10.408203 17.958984 L 10.136719 17.996094 L 9.8632812 17.996094 L 9.59375 17.958984 L 9.3320312 17.884766 L 9.0800781 17.775391 L 8.8476562 17.634766 L 8.6367188 17.462891 L 8.4492188 17.261719 L 8.2910156 17.039062 L 8.2714844 17 z "
                                style={{ fill: "#ff0000", fillOpacity: 1, strokeWidth: "0.0002" }}
                              />{" "}
                            </g>{" "}
                          </g>
                        </svg>
                      </div>
                      <div className="alert-message col-xs-12">
                        <strong>Atenção!</strong> {errorAcesso}
                      </div>
                    </div>
                  </div>
                }

              </div>

            }
            footer={
              <div className='row'>
                <div className="col-12 col-xs-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                  <button className="btn btn-primary btn-xs m-2" onClick={() => { setModalError(false); setErrorAcesso(""); }}> Voltar </button>

                </div>
              </div>
            }
          />
      </header>
    </div>
  );
}

export default Home;
