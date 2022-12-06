import axios from 'axios';
import store from '@/store';

// const baseUrl = 'http://192.168.31.177:5050';
const baseUrl = 'http://127.0.0.1:5050';
export const http = axios.create({
    baseURL: baseUrl
});

// const getAuthToken = () => localStorage.getItem('token');
//
// const authInterceptor = (config: any) => {
//     config.headers['AuthToken'] = getAuthToken();
//     return config;
// };

const errorInterceptor = (error: any): Promise<never> => {
    if (!error.response) {
        return Promise.reject({ message: 'error_network_server_error' });
    }

    switch (error.response.status) {
        case 400:
            console.error(error.response.status, error.response.data);
            break;

        case 401:
            store.dispatch('modules/logout', { msg: 'session_expired' });
            break;

        default:
            console.error(error.response.status, error.response.data);
    }
    return Promise.reject(error);
};

const responseInterceptor = (response: any) => {
    switch (response.status) {
        case 200:
            break;
        default:
            break;
    }
    return response;
};

// http.interceptors.request.use(authInterceptor);
http.interceptors.response.use(responseInterceptor, errorInterceptor);

export default { http };
