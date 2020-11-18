<template>
<div>
	<Navbar />
	<div class="form-content p-5">
		<h3>Editando componente</h3>
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

			<p class="mt-3">Imagen a subir:</p>
			<b-form-file
				class="mb-4"
				v-model="image"
				:state="Boolean(image)"
				placeholder="Selecciona un archivo o arrástralo aquí..."
				accept=".jpeg, .jpg, .png"
				browse-text="Examinar"
				required
				style="min-width:500px;"
			></b-form-file>

            <div class="separate">
                <b-button class="mr-5" href="javascript:history.back()" variant="danger">Cancelar</b-button>
                <b-button type="submit" variant="primary">Aceptar</b-button>
            </div>
		</b-form>
	</div>

	<b-modal ref="confirmationModal" size="lg" :hide-footer="true" title="Confirmación de edición">
		<h1>
			¿Está seguro?
		</h1>
		
		<h3>
			Los datos podrían no recuperarse tras realizar esta acción.
		</h3>

		<div class="separate">
			<b-button class="mt-4" variant="secondary btn-lg" @click="cancelConfirmation()">Cancelar</b-button>
			<b-button class="mt-4" variant="warning btn-lg" @click="confirm()">Confirmar y editar</b-button>
		</div>
	</b-modal>

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
			otherName: null,
			image: null
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
			alert(err.message);
		})
	},
	methods: {
		onSubmit: function(evt) {
			evt.preventDefault();
			this.$refs.confirmationModal.show();
		},
		confirm: function(){
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
				this.cancelConfirmation();
				alert(err.message);
			});
		},

		cancelConfirmation: function(){
			this.$refs.confirmationModal.hide();
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