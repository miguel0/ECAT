import axios from '../config/axios';

export default {
    
    getVehicle: (id) => {
        return axios.get(`/vehicles/${id}`)
        .then(res => {return res.data})
        .catch(err => { throw err.response.data });
    }
}