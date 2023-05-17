import api from "./Api";

import Cookies from "universal-cookie";

const cookies = new Cookies();

const login = (token: string) =>
{try {
    return api.get("/v3/timezone").then((response : any) => {
        console.log(response);
        return response;
    }
);
} catch (error) {
	console.error(error);

}
}

const getToken = () => {
    let token = cookies.get('token');
    if(token != undefined)
    {
        return token;
    }
    return null;
};

export default {

    login, 
    getToken,
    
}