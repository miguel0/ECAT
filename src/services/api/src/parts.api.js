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
	},
	
	editPart: (id, repalceNo, name, chName, spName, otherName) => {
		return axios.put(`/parts/${id}`, {
			repalceNo: repalceNo,
			name: name,
			chName: chName,
			spName: spName,
			otherName: otherName,
		})
			.then(res => { return res.data })
			.catch(err => { throw err.response.data })
	}
    
}
