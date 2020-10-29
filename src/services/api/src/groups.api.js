import axios from '../config/axios';

export default {
    
    getGroup: (id) => {
        return axios.get(`/groups/${id}`)
            .then(res => {return res.data})
            .catch(err => { throw err.response.data })
    }
}