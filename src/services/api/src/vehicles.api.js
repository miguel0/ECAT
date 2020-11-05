import axios from '../config/axios';

export default {
    
    getVehicle: (id) => {
        return axios.get(`/vehicles/${id}`);
    },
    getAllVehicles: () => {
        return axios.get('/vehicles');
	},
	addVehicle: (id, vehicle) => {
		return axios.post(`/vehicles/${id}`, vehicle);
	}
}