import axios from '../config/axios';

export default {
	getGroup: (id) => {
		return axios.get(`/groups/${id}`);
	},
	editGroup: (id, name, chName, spName, otherName) => {
		return axios.put(`/groups/${id}`, {
			name: name,
			chName: chName,
			spName: spName,
			otherName: otherName
		})
	}
}