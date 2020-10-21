import axios from '../config/axios';

export default {
    
    getAllParts: () => {
        return axios.get('/users');
    }
    
}
