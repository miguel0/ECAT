<template>
<div>
	<Navbar />
	<div class="p-5">
		<b-form @submit="onSubmit">
			<b-form-group label="Número de parte:">
				<b-form-input v-model="partId" readonly></b-form-input>
			</b-form-group>

			<b-form-group label="Número de reemplazo:">
				<b-form-input v-model="replaceNo" placeholder="Escriba el número de reemplazo..."></b-form-input>
			</b-form-group>

			<b-form-group label="Nombre en inglés:">
				<b-form-input v-model="name" placeholder="Escriba el nombre en inglés..."></b-form-input>
			</b-form-group>

			<b-form-group label="Nombre en español:">
				<b-form-input v-model="spName" placeholder="Escriba el nombre en español..."></b-form-input>
			</b-form-group>

			<b-form-group label="Nombre en chino:">
				<b-form-input v-model="chName" placeholder="Escriba el nombre en chino..."></b-form-input>
			</b-form-group>

			<b-form-group label="Otros nombres:">
				<b-form-input v-model="otherName" placeholder="Escriba el otros nombres..."></b-form-input>
			</b-form-group>

			<b-button type="submit" variant="primary">Submit</b-button>
		</b-form>
	</div>
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
		onSubmit: function(evt) {
			evt.preventDefault();

			if(this.partId === this.replaceNo) {
				alert('El número de parte y el número de reemplazo no pueden ser el mismo.');
			} else {
				api.partsApi.editPart(this.partId, this.repalceNo, this.name, this.chName, this.spName, this.otherName);
			}
		}
	}
}
</script>

<style scoped>

</style>