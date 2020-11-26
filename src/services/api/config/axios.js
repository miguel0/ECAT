import axios from 'axios';
import { apiOrigin } from '../../../variables';
import * as firebase from '../../../firebase';


const myAxios = axios.create({
    baseURL: apiOrigin
});

// Request interceptor (attach authorization header)
myAxios.interceptors.request.use(
    async config => {
        const token = await firebase.auth.currentUser.getIdToken();
        config.headers = {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        return config;
    },
    () => {
        throw {message: "Error making request to server."};
    }
);

// Response interceptor
myAxios.interceptors.response.use(
    response => {
        return response.data;
    },
    async error => {
        if(!error.response) {
            throw {message: "Error de conexión con el servidor."};
        }
        
        if(error.response.status === 403) {
            // TODO take to login screen
        }
        //TODO: Filter 
        throw error.response.data;
        
    }
);

export default myAxios;

