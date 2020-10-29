import axios from '../config/axios';

export default {
	deleteComponentPart: (id) => {
		return axios.delete(`/component-parts/${id}`)
			.then(res => { return res.data })
			.catch(err => { throw err.response.data })
	}
}
