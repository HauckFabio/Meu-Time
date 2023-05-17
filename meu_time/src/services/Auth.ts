import api from "./Api";

import Cookies from "universal-cookie";

const cookies = new Cookies();

const login = (token: any) => {
    cookies.set('token', token);

    return api.get("v3/timezone")
        .then((response: any) => {
            console.log(response);

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
const getToken = () => {
    let token = cookies.get('token');
    if(token !== null)
    {
        return token;
    }
    return null;
};

export default {

    login, 
    getToken,
    
}