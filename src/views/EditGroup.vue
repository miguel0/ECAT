<template>
<div>
	<Navbar />
	<div class="form-content p-5">
		<h3>Editando parte</h3>
		<br>
		<b-form @submit="onSubmit">
			<b-form-group label="Nombre en inglés:">
				<b-form-input v-model="name" required></b-form-input>
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

			<div class="separate">
				<b-button class="mr-5" href="javascript:history.back()" variant="danger">Cancelar</b-button>
				<b-button type="submit" variant="primary">Aceptar</b-button>
			</div>
		</b-form>
	</div>
</div>
</template>

<script>
import Navbar from '../components/Navbar';
import api from '../services/api/api';

export default {
	name: 'EditGroup',
	data() {
		return {
			groupId: null,
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
		api.groupsApi.getGroup(this.$route.params.gid)
		.then(group => {
			this.groupId = group.id ? group.id : '';
			this.name = group.name ? group.name : '';
			this.spName = group.spName ? group.spName : '';
			this.chName = group.chName ? group.chName : '';
			this.otherName = group.otherName ? group.otherName : '';
		})
		.catch(err => {
			console.log(err);
		})
	},
	methods: {
		onSubmit: function(evt) {
			evt.preventDefault();

			api.groupsApi.editGroup(this.groupId, this.name, this.chName, this.spName, this.otherName)
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
.separate{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
</style>