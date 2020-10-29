import axios from '../config/axios';

export default {
    
    getAllParts: () => {
        return axios.get('/parts')
            .then(res => { return res.data })
            .catch(err => { throw err.response.data })
    },

    getPart: (id) => {
        return axios.get(`/parts/${id}`)
            .then(res => { return res.data })
            .catch(err => { throw err.response.data })
    }
    
}
