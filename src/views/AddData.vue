<template>
	<div>
		<Navbar />
		<b-container id="table" class="bv-example-row" fluid>
			<b-row>
				<b-col class="add_option" id="file">
					<div class="my_form cont">
						<h2>Subir con archivo</h2>
						<div id="file_add" class="cont">
							<p>Archivo de Excel a subir:</p>
							<b-form @submit="onSubmitFile">
								<b-form-file
									v-model="file"
									:state="Boolean(file)"
									placeholder="Selecciona un archivo o arrastralo aquí..."
									drop-placeholder="Drop file here..."
									accept=".xlsx"
									browse-text="Examinar"
									required
								></b-form-file>
								<div class="mt-3">Archivo seleccionado: {{ file ? file.name : '' }}</div>

								<b-form-group id="type" label="Tipo:">
									<b-form-select
										v-model="type1"
										:options="types"
										required
									></b-form-select>
								</b-form-group>

								<b-button class="my_submit" type="submit" variant="primary">Subir</b-button>
							</b-form>
						</div>
					</div>
				</b-col>
				<b-col class="add_option" id="manual">
					<div class="my_form cont cont">
						<h2>Subir manualmente</h2>
						<div id="manual_add">
							<b-form @submit="onSubmitManual">
								<b-form-group class="manual_input" label="Nombre del elemento:">
									<b-form-input
										v-model="name"
										required
										placeholder="Nombre"
									></b-form-input>
								</b-form-group>

								<b-form-group class="manual_input" label="ID del elemento:">
									<b-form-input
										v-model="id"
										required
										placeholder="ID"
									></b-form-input>
								</b-form-group>

								<b-form-group id="type" label="Tipo:">
									<b-form-select
										v-model="type2"
										:options="types"
										required
									></b-form-select>
								</b-form-group>

								<b-button class="my_submit" type="submit" variant="primary">Subir</b-button>
							</b-form>
						</div>
					</div>
				</b-col>
			</b-row>
		</b-container>

		<b-modal id="modal" ok-only>
			<p class="my-4">AGREGADO</p>
		</b-modal>
	</div>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
	name: "AddData",
	data() {
		return {
			file: null,
			type1: null,
			name: "",
			id: "",
			type2: null,
			types: [{ text: 'Selecciona uno', value: null }, 'Unidad', 'Grupo', 'Componente', 'Parte'],
		}
	},
	components: {
			Navbar
	},
	methods: {
		onSubmitFile(evt) {
			evt.preventDefault();
			console.log("file: " + this.file.name + " type " + this.type1);
			this.file = null;
			this.type1 = null;
			this.$bvModal.show("modal");
		},
		onSubmitManual(evt) {
			evt.preventDefault();
			console.log("name: " + this.name + " id: " + this.id + " type " + this.type1);
			this.name = "";
			this.id = "";
			this.type2 = null;
			this.$bvModal.show("modal");
		}
	}
}
</script>

<style scoped>
#table {
	padding-top: 5%;
	padding-left: 15%;
	padding-right: 15%;
}
#manual {
	border-left: solid thin lightgray;
}
.my_form {
	padding-top: 5%;
	padding-left: 5%;
	padding-bottom: 10%;
}
#file_add {
	padding-top: 10%;
}
#type {
	margin-top: 7%;
	width: 35%;
}
.my_submit {
	min-width: 130px;
	margin-top: 5%;
	position: absolute;
	bottom: 5%;
}
#manual_add {
	padding-top: 10%;
}
.manual_input {
	margin-top: 1.8%;
}
.cont {
	height: 100%;
}
.manual_input {
	max-width: 400px;
}
#type {
	margin-bottom: 50px;
}
</style>
