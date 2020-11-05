import axios from '../config/axios';

export default {
    
    getGroup: (id) => {
        return axios.get(`/groups/${id}`);
    }
}