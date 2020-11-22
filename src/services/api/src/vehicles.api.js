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
    },
	editVehicle: (id, name, spName, otherName, model, type, motorConfig, motorPower, transmission) => {
        return axios.put(`/vehicles/${id}`, {
            name: name,
            spName: spName,
            otherName: otherName,
            model: model,
            type: type,
            motorConfig: motorConfig,
            motorPower: motorPower,
            transmission: transmission
		})
	},

    editVehicleImage: (id, imageUrl) => {
        return axios.put(`/vehicles/pushimg${id}`, {
            imageUrl: imageUrl
        })
    }
}