import axios from '../config/axios';

export default {

    getAllComponents: () => {
        return axios.get('/users');
    },
    getComponent: (id) => {
        return axios.get(`/components/${id}`);
    }

} 