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
			.then(res => { return res.data })
			.catch(err => { throw err.response.data })
	}

} 