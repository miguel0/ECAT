import axios from '../config/axios';

export default {
    
    getAllParts: () => {
        return axios.get('/parts');
    },

    getPart: (id) => {
        return axios.get(`/parts/${id}`);
	},
	
	editPart: (id, replaceNo, name, chName, spName, otherName, imageURL) => {
		return axios.put(`/parts/${id}`, {
			replaceNo: replaceNo,
			name: name,
			chName: chName,
			spName: spName,
			otherName: otherName,
			imageURL: imageURL,
		})
	},

	addPart: (id, replaceNo, name, chName, spName, otherName, imageURL) => {
		return axios.post(`/parts/${id}`, {
			replaceNo: replaceNo,
			name: name,
			chName: chName,
			spName: spName,
			otherName: otherName,
			imageURL: imageURL,
		});
	}
    
}
