import axios from '../config/axios';

export default {
	deleteComponentPart: (id) => {
		return axios.delete(`/component-parts/${id}`);
	}
}
