import axios from "axios";
import auth from "./Auth";

const configValue: string = (process.env.REACT_APP_API_URL as string);
const apiService = axios.create({
    baseURL : configValue,
})

apiService.interceptors.request.use(async config => {
    const token = auth.getToken();
    if(token)
    {
        config.headers = {
            Accept: "application/json",
            Authorization: `X-RapidAPI-Key ${token}`,
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        };
    }

    return config;

})


export default apiService;