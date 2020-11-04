import axios from '../config/axios';

export default {

    getAllComponents: () => {
        return axios.get('/users');
    },
    
    getComponent: (id) => {
        return axios.get(`/components/${id}`)
            .then(res => { return res.data })
            .catch(err => { throw err.response.data })
    },

} 