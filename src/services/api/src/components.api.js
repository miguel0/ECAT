import axios from '../config/axios';

export default {

    getAllComponents: () => {
        return axios.get('/users');
    },
    
    getComponent: (id) => {
        return axios.get(`/components/${id}`);
	},

	editComponent: (id, name, chName, spName, otherName) => {
		return axios.put(`/components/${id}`, {
			name: name,
			chName: chName,
			spName: spName,
			otherName: otherName,
		})
	},

	editComponentImage: (id, imageUrl) => {
		return axios.put(`/components/pushimg${id}`, {
			imageUrl: imageUrl
		})
	}
} 