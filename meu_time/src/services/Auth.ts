import api from "./Api";
import { Subject } from 'rxjs';
import Cookies from "universal-cookie";

const subject = new Subject();
const cookies = new Cookies();

const login = (token: any) => {
    cookies.set('token', token);

    return api.get("v3/timezone")
    .then((response: any) => {
        if (response.status !== 200) {
            logout();
            return null;
        }
        
        observable.setToken(token);
            return response;
        })
        .catch((error: any) => {
            console.error(error);
            // O erro será registrado no console, mas não será lançado novamente.
        });
};

const logout = () => {
    const allCookies = cookies.getAll();

    Object.keys(allCookies).forEach(cookieName => {
    cookies.remove(cookieName);
    });
		
    observable.clearToken()
    return true;

};

const getToken = () => {
    let token = cookies.get('token');
    if(token !== null)
    {
        return token;
    }
    return null;
};

const observable = {
    setToken: (token:any) => subject.next(token),
    clearToken: () => subject.next(null),
    onToken: () => subject.asObservable()
};


export default {

    login, 
    getToken,
    observable,
    logout,
}