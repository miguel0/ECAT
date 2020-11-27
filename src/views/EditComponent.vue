<template>
<div>
	<Navbar />
	<div class="form-content p-5">
		<h3>Editando componente</h3>
		<br>
		<b-form @submit="onSubmit">
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

			<div class="separate">
				<b-button class="mr-5" href="javascript:history.back()" variant="danger">Cancelar</b-button>
				<b-button type="submit" variant="primary">Aceptar</b-button>
			</div>
		</b-form>
	</div>

	<ConfirmationModal
		mode="edit"
		ref="modalC"
		@onConfirm="confirm()"
		@onCancel="cancelConfirmation()"
	/>

</div>
</template>

<script>
import Navbar from '../components/Navbar';
import api from '../services/api/api';
import imgHelper from '../imguploadhelpers';
import ConfirmationModal from '../components/ConfirmationModal';

export default {
	name: 'EditComponent',
	data() {
		return {
			componentId: null,
			name: null,
			spName: null,
			chName: null,
			otherName: null,
			image: null,
			imageURL: null
		}
	},
	components: {
		Navbar,
		ConfirmationModal
	},
	created: function() {
		api.componentsApi.getComponent(this.$route.params.cid)
		.then(component => {
			this.componentId = component.id ? component.id : '';
			this.name = component.name ? component.name : '';
			this.spName = component.spName ? component.spName : '';
			this.chName = component.chName ? component.chName : '';
			this.otherName = component.otherName ? component.otherName : '';
			this.imageURL = component.imageURL ? component.imageURL : '';
		})
		.catch(err => {
			this.$bvModal.msgBoxOk(err.message, {centered: true});
		})
	},
	methods: {
		onSubmit: function(evt) {
			evt.preventDefault();
			this.$refs.modalC.showModal();
		},
		confirm: async function(){
            if (this.image != null) {
                let folder = 'components/';
                this.imageURL = await imgHelper.uploadSinglePicture(folder, this.image);
                if (this.imageURL === '') {
					this.cancelConfirmation();
					this.$bvModal.msgBoxOk('Error al subir imagen.', {centered: true});
					return;
                }
            }

            api.componentsApi.editComponent(this.componentId, this.name, this.chName, this.spName, this.otherName, this.imageURL)
            .then(res => {
                if(res === true) {
                    window.history.back();
                } else if(res.includes('value too large for column')) {
					this.$bvModal.msgBoxOk('Uno de los campos es muy largo, trate de modificarlo para que sea más corto.', {centered: true});
                } else {
					this.$bvModal.msgBoxOk("Ocurrió un error.", {centered: true});
                }
            })
            .catch(err => {
                this.cancelConfirmation();
				this.$bvModal.msgBoxOk(err.message, {centered: true});
            });
		},

		cancelConfirmation: function(){
			this.$refs.modalC.hideModal();
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