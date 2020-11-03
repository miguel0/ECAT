<template>
<div>
	<Navbar />
	<div id="content" class="mt-5">
			<h2 class="centered">Subir una parte manualmente</h2>
			<div>
				<b-form @submit="onSubmit">
					<b-form-group label="Número de parte:">
						<b-form-input v-model="partId" required></b-form-input>
					</b-form-group>

					<b-form-group label="Número de reemplazo:">
						<b-form-input v-model="replaceNo"></b-form-input>
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

					<div id="btn_div">
						<b-button class="mr-5" href="javascript:history.back()" variant="danger">Cancelar</b-button>
						<b-button type="submit" variant="primary">Aceptar</b-button>
					</div>
				</b-form>
			</div>
		</div>
</div>
</template>

<script>
import Navbar from '../components/Navbar';

export default {
	name: 'AddDataManual',
	components: {
		Navbar
	},
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
	methods: {
		onSubmit: function(evt) {
			evt.preventDefault();
			if(this.partId === this.replaceNo) {
				alert('El número de parte y el número de reemplazo no pueden ser el mismo.');
			}
		}
	}
}
</script>

<style scoped>
#content {
	max-width: 600px;
	margin: auto;
}
#btn_div {
	display: flex;
	align-items: center;
	justify-content: center;
}
.centered {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
}
</style>