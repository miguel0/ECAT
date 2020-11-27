<template>
<div>
	<Navbar />
	<div id="content" class="mt-5">
			<h2 class="centered">Subir una parte manualmente</h2>
			<br>
			<div>
				<b-form @submit="onSubmit">
					<b-form-group label="Número de parte:">
						<b-form-input v-model="partId" required></b-form-input>
                        <b-form-text text-variant="danger">Campo requerido</b-form-text>
					</b-form-group>

					<b-form-group label="Número de reemplazo:">
						<b-form-input v-model="replaceNo"></b-form-input>
					</b-form-group>

					<b-form-group label="Nombre en inglés:">
						<b-form-input v-model="name" required></b-form-input>
                        <b-form-text text-variant="danger">Campo requerido</b-form-text>
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

					<p class="mt-3">Imagen a subir:</p>
					<b-form-file
						class="mb-2"
						v-model="image"
						:state="true"
						placeholder="Selecciona un archivo o arrástralo aquí..."
						accept=".jpeg, .jpg, .png"
						browse-text="Examinar"
						style="min-width:500px;"
					></b-form-file>
					<b-button class="mb-4" @click="image = null; imageURL = '';">Borrar imagen</b-button>

					<div id="btn_div">
						<b-button class="mr-5" href="javascript:history.back()" variant="danger">Cancelar</b-button>
						<b-button type="submit" variant="primary">Aceptar</b-button>
					</div>
				</b-form>
			</div>
		</div>

		<b-modal ref="confirmationModal" size="lg" :hide-footer="true" title="Confirmación de inserción">
		<h1>
			¿Está seguro?
		</h1>
		
		<h3>
			Asegúrese de que los datos sean correctos.
		</h3>

		<div class="separate">
			<b-button class="mt-4" variant="secondary btn-lg" @click="cancelConfirmation()">Cancelar</b-button>
			<b-button class="mt-4" variant="primary btn-lg" @click="confirm()">Confirmar y subir</b-button>
		</div>
	</b-modal>

</div>
</template>

<script>
import Navbar from '../components/Navbar';
import api from '../services/api/api';
import imgHelper from '../imguploadhelpers';

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
			otherName: null,
			imageURL: null,
			image: null
		}
	},
	methods: {
		onSubmit: function(evt) {
			evt.preventDefault();
			this.$refs.confirmationModal.show();
		},
		confirm: async function(){
			if(this.partId === this.replaceNo) {
				alert('El número de parte y el número de reemplazo no pueden ser el mismo.');
			} else {
                let folder = 'parts/';
				this.imageURL = await imgHelper.uploadSinglePicture(folder, this.image);
				if (this.imageURL !== '') {
                    api.partsApi.addPart(this.partId, this.replaceNo, this.name, this.chName, this.spName, this.otherName, this.imageURL)
                        .then(res => {
                            if (res === true) {
                                window.history.back();
                            } else if (res.includes('value too large for column')) {
                                alert('Uno de los campos es muy largo, trate de modificarlo para que sea más corto.');
                            } else if (res.includes('unique constraint')) {
                                alert('Ya existe una parte con ese número de parte o ese número de reemplazo.');
                            } else {
                                console.log(res);
                                alert("Ocurrió un error.");
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else {
                    alert('Error al subir imagen.');
                }
			}
		},

		cancelConfirmation: function(){
			this.$refs.confirmationModal.hide();
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
	justify-content: space-between;
}
.centered {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
}
.separate{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
</style>