import axios from '../config/axios';

export default {
	getAllUsers: () => {
		return axios.get(`/users/`);
	},

	getUser: (id) => {
		return axios.get(`/users/${id}`);
	},

	editUser: (id, name, role, tel, position, area, email) => {
		return axios.put(`/users/${id}`, {
			name: name,
			role: role,
			tel: tel,
			position: position,
			area: area,
			email: email,
		});
	},

	addUser: (name, role, tel, position, area, email, password) => {
		return axios.post(`/users/`, {
			name: name,
			role: role,
			tel: tel,
			position: position,
			area: area,
			email: email,
			password: password,
		});
	},

	deleteUser: (id) => {
		return axios.delete(`/users/${id}`);
	}
}
