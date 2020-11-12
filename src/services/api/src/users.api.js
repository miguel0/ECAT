import axios from '../config/axios';

export default {
	getUser: (id) => {
		return axios.get(`/users/${id}`);
	}
}
