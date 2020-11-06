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
        console.log('Component Test VICTOR & WILSON');
        return config;
    },
    () => {
        throw {message: "Error making request to server."};
    }
);

// Response interceptor
myAxios.interceptors.response.use(
    response => {
        console.log('Component Test 2 VICTOR & WILSON');
        return response.data;
    },
    async error => {
        console.log(error);
        const ogRequest = error.config;
        if(error.response.status === 403 && !ogRequest._retry) {
            /*ogRequest._retry = true;
            const token = await firebase.auth.currentUser.getIdToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            console.log("retry");
            return axios(ogRequest);*/

            // TODO take to login screen
        }
        //TODO: Filter 
        console.log('Component Test 3 VICTOR & WILSON');
        throw error.response.data;
        
    }
);

export default myAxios;

