<template>
<div>
	<Navbar />
</div>
</template>

<script>
import Navbar from '../components/Navbar';
import api from '../services/api/api';

export default {
	name: 'EditPart',
	data() {
		return {
			partId: null,
			replaceNo: null,
			name: null,
			spName: null,
			chName: null,
			otherName: null
		}
	},
	components: {
		Navbar
	},
	created: function() {
		api.partsApi.getPart(this.$route.params.pid)
		.then(part => {
			this.partId = part.id ? part.id : '';
			this.replaceNo = part.replaceNo ? part.replaceNo : '';
			this.name = part.name ? part.name : '';
			this.spName = part.spName ? part.spName : '';
			this.chName = part.chName ? part.chName : '';
			this.otherName = part.otherName ? part.otherName : '';
		})
		.catch(err => {
			console.log(err);
		})
	},
	methods: {
		submit: function() {
			
		}
	}
}
</script>

<style scoped>

</style>