import axios from '../config/axios';

export default {
    
    getVehicle: (id) => {
        return axios.get(`/vehicles/${id}`)
        .then(res => {return res.data})
        .catch(err => { throw err.response.data });
    },
    getAllVehicles: () => {
        return axios.get('/vehicles')
        .then(res => {return res.data})
        .catch(err => { throw err.response.data });
    }
}