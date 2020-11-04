<template>
<div>
	<Navbar />
	<div class="form-content p-5">
		<b-form @submit="onSubmit">
			<b-form-group label="Número de componente:">
				<b-form-input v-model="componentId" readonly></b-form-input>
			</b-form-group>

			<b-form-group label="Nombre en inglés:">
				<b-form-input v-model="name"></b-form-input>
			</b-form-group>

			<b-form-group label="Nombre en español:">
				<b-form-input v-model="spName"></b-form-input>
			</b-form-group>

			<b-form-group label="Nombre en chino:">
				<b-form-input v-model="chName"></b-form-input>
			</b-form-group>

			<b-form-group label="Otros nombres:">
				<b-form-input v-model="otherName"></b-form-input>
			</b-form-group>

			<b-button class="mr-5" href="javascript:history.back()" variant="danger">Cancelar</b-button>
			<b-button type="submit" variant="primary">Aceptar</b-button>
		</b-form>
	</div>
</div>
</template>

<script>
import Navbar from '../components/Navbar';
import api from '../services/api/api';

export default {
	name: 'EditComponent',
	data() {
		return {
			componentId: null,
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
		api.componentsApi.getComponent(this.$route.params.cid)
		.then(component => {
			this.componentId = component.id ? component.id : '';
			this.name = component.name ? component.name : '';
			this.spName = component.spName ? component.spName : '';
			this.chName = component.chName ? component.chName : '';
			this.otherName = component.otherName ? component.otherName : '';
		})
		.catch(err => {
			console.log(err);
		})
	},
	methods: {
		onSubmit: function(evt) {
			evt.preventDefault();

			api.componentsApi.editComponent(this.componentId, this.name, this.chName, this.spName, this.otherName)
			.then(res => {
				if(res === true) {
					window.history.back();
				} else if(res.includes('value too large for column')) {
					alert('Uno de los campos es muy largo, trate de modificarlo para que sea más corto.');
				} else {
					alert("Ocurrió un error.");
				}
			})
			.catch(err => {
				console.log(err);
			});
			
		}
	}
}
</script>

<style scoped>
.form-content {
	max-width: 600px;
	margin: auto;
}
</style>