import axios from '../config/axios';

export default {
    
    getAllParts: () => {
        return axios.get('/parts');
    },

    getPart: (id) => {
        return axios.get(`/parts/${id}`);
	},
	
	editPart: (id, repalceNo, name, chName, spName, otherName) => {
		return axios.put(`/parts/${id}`, {
			repalceNo: repalceNo,
			name: name,
			chName: chName,
			spName: spName,
			otherName: otherName,
		})
	},

	test: () => {
		return axios.get('/parts');
	}
    
}
