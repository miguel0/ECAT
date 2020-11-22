import axios from '../config/axios';

export default {
    
    getAllParts: () => {
        return axios.get('/parts');
    },

    getPart: (id) => {
        return axios.get(`/parts/${id}`);
	},
	
	editPart: (id, replaceNo, name, chName, spName, otherName) => {
		return axios.put(`/parts/${id}`, {
			replaceNo: replaceNo,
			name: name,
			chName: chName,
			spName: spName,
			otherName: otherName,
		})
	},

	editPartImage: (id, imageUrl)  => {
		return axios.put(`/parts/pushimg${id}`, {
			imageUrl: imageUrl,
		})
	},

	addPart: (id, replaceNo, name, chName, spName, otherName) => {
		return axios.post(`/parts/${id}`, {
			replaceNo: replaceNo,
			name: name,
			chName: chName,
			spName: spName,
			otherName: otherName,
		});
	}
    
}
