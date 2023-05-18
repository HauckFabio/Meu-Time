import api from "./Api";

import Cookies from "universal-cookie";

const countries = () => {

    return api.get("v3/countries")
        .then((response: any) => {

            if (response.status !== 200) {
                return null;
            }
            return response;
        })
        .catch((error: any) => {
            console.error(error);
            // O erro será registrado no console, mas não será lançado novamente.
        });
};

const seasons = () => {

    return api.get("v3/leagues/seasons")
        .then((response: any) => {

            if (response.status !== 200) {
                return null;
            }
            return response;
        })
        .catch((error: any) => {
            console.error(error);
            // O erro será registrado no console, mas não será lançado novamente.
        });
};

const leagues = (code : any, season : any) => {

    return api.get("v3/leagues",
        {
            params:  {
                code: code,
                season: season
              },
        }
    )
        .then((response: any) => {

            if (response.status !== 200) {
                return null;
            }
            return response;
        })
        .catch((error: any) => {
            console.error(error);
            // O erro será registrado no console, mas não será lançado novamente.
        });
};

const teams = (country : any, season : any, league : any) => {

    return api.get("v3/teams",
        {
            params:  {
                country: country,
                season: season,
                league: league
              },
        }
    )
        .then((response: any) => {

            if (response.status !== 200) {
                return null;
            }
            return response;
        })
        .catch((error: any) => {
            console.error(error);
            // O erro será registrado no console, mas não será lançado novamente.
        });
};

const statisticsTeam = (team : any, season : any, league : any) => {

    return api.get("v3/teams/statistics",
        {
            params:  {
                team: team,
                season: season,
                league: league
              },
        }
    )
        .then((response: any) => {

            if (response.status !== 200) {
                return null;
            }
            return response;
        })
        .catch((error: any) => {
            console.error(error);
            // O erro será registrado no console, mas não será lançado novamente.
        });
};

const players = (team : any, season : any, league : any) => {

    return api.get("v3/players",
        {
            params:  {
                team: team,
                season: season,
                league: league
              },
        }
    )
        .then((response: any) => {

            if (response.status !== 200) {
                return null;
            }
            return response;
        })
        .catch((error: any) => {
            console.error(error);
            // O erro será registrado no console, mas não será lançado novamente.
        });
};

export default {

    countries, 
    seasons,
    leagues,
    teams,
    statisticsTeam,
    players,
    
}