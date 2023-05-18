import { Subject } from 'rxjs';
import api from "../../services/Api";

const subject = new Subject();
let loadingCount = 0;
api.interceptors.request.use(async config => {
    loadingCount = loadingCount + 1;
    messageService.setLoading(true);
    return config;
});


api.interceptors.response.use(function (response : any) {
    // Do something with response data
    loadingCount = loadingCount - 1;
    if (loadingCount === 0) {
        messageService.setLoading(false);
    }
    return response;
}, function (error  : any) {
    // Do something with response error
    loadingCount = loadingCount - 1;
    if (loadingCount === 0) {
        messageService.setLoading(false);
    }
    return error.response;
});


const messageService = {
    setLoading: (loading: any) => subject.next(loading),
    clearLoading: () => subject.next,
    onLoading: () => subject.asObservable()
};

export default messageService;