import axios from '../config/axios';

export default {

    getAllComponents: () => {
        return axios.get('/users');
    }

} 