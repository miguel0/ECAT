import axios from '../config/axios';

export default {
	deleteComponentPart: (id) => {
		return axios.delete(`/component-parts/${id}`);
	},

	getComponentPart: (id) => {
		return axios.get(`/component-parts/${id}`);
	},

	editComponentPart: (id, remark, localQty) => {
		return axios.put(`/component-parts/${id}`, {
			remark: remark,
			localQty: localQty,
		});
	}
}
