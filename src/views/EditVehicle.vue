<template>
<div>
	<Navbar />
	<div class="form-content p-5">
		<h3>Editando vehículo</h3>
		<br>
		<b-form @submit="onSubmit">
			<b-form-group label="ID del vehículo:">
				<b-form-input v-model="vehicleId" readonly></b-form-input>
			</b-form-group>

			<b-form-group label="Nombre en inglés:">
				<b-form-input required v-model="name"></b-form-input>
                <b-form-text text-variant="danger">Campo requerido</b-form-text>
			</b-form-group>

			<b-form-group label="Nombre en español:">
				<b-form-input required v-model="spName"></b-form-input>
                <b-form-text text-variant="danger">Campo requerido</b-form-text>
			</b-form-group>

			<b-form-group label="Otros nombres:">
				<b-form-input v-model="otherName"></b-form-input>
			</b-form-group>

			<b-form-group label="Modelo:">
				<b-form-select v-model="model" :options="modelOptions"></b-form-select>
			</b-form-group>

			<b-form-group label="Tipo:">
				<b-form-select v-model="type" :options="typeOptions"></b-form-select>
			</b-form-group>

			<b-form-group label="Configuración del motor:">
				<b-form-select v-model="motorConfig" :options="motorConfigOptions"></b-form-select>
			</b-form-group>
			
			<b-form-group label="Poder del motor:">
				<b-form-select v-model="motorPower" :options="motorPowerOptions"></b-form-select>
			</b-form-group>

			<b-form-group label="Transmisión:">
				<b-form-select v-model="transmission" :options="transmissionOptions"></b-form-select>
			</b-form-group>

			<p class="mt-4">Imagen a subir:</p>
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
	name: 'EditVehicle',
	data() {
		return {
			vehicleId: null,
			name: null,
			spName: null,
			otherName: null,
			model: null,
			type: null,
			motorConfig: null,
			motorPower: null,
			transmission: null,
			imageURL: null,
			image: null,
			modelOptions: [
				{ value: 'C7H', text: 'C7H' },
				{ value: 'T5G', text: 'T5G' }
			],
			typeOptions: [
				{ value: 'MT GAS', text: 'CNG' },
				{ value: 'MC DIESEL', text: 'Diesel' }
			],
			motorConfigOptions: [
				{ value: '6x2', text: '6x2' },
				{ value: '6x4', text: '6x4' },
				{ value: '6x6', text: '6x6' },
				{ value: '8x4', text: '8x4' }
			],
			motorPowerOptions: [
				{ value: 240, text: '240 HP' },
				{ value: 280, text: '280 HP' },
				{ value: 330, text: '330 HP' },
				{ value: 410, text: '410 HP' },
				{ value: 430, text: '430 HP' },
				{ value: 540, text: '540 HP' }
			],
			transmissionOptions: [
				{ value: 'ZF', text: 'ZF' },
				{ value: 'HW', text: 'HW' },
				{ value: 'AL', text: 'Allison' }
			]
		}
	},
	components: {
		Navbar,
		ConfirmationModal
	},
	created: function() {
		api.vehiclesApi.getVehicle(this.$route.params.vid)
		.then(vehicle => {
            this.vehicleId = vehicle.id ? vehicle.id : '';
            this.name = vehicle.name ? vehicle.name : '';
            this.spName = vehicle.spName ? vehicle.spName : '';
            this.otherName = vehicle.otherName ? vehicle.otherName : '';
            this.model = vehicle.model ? vehicle.model : '';
            this.type = vehicle.type ? vehicle.type : '';
            this.motorConfig = vehicle.motorConfig ? vehicle.motorConfig : '';
            this.motorPower = vehicle.motorPower ? vehicle.motorPower : '';
			this.transmission = vehicle.transmission ? vehicle.transmission : '';
			this.imageURL = vehicle.imageURL ? vehicle.imageURL : '';
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
			if(this.vehicleId === this.name) {
				this.$bvModal.msgBoxOk('El número de parte y el número de reemplazo no pueden ser el mismo.', {centered: true});
			} else {
                if (this.image != null) {
                    let folder = 'vehicles/';
                    this.imageURL = await imgHelper.uploadSinglePicture(folder, this.image);
                    if (this.imageURL === '') {
						this.cancelConfirmation();
						this.$bvModal.msgBoxOk('Error al subir imagen.', {centered: true});
						return;
                    }
                }

                api.vehiclesApi.editVehicle(this.vehicleId, this.name, this.spName, this.otherName, this.model, this.type, this.motorConfig, this.motorPower, this.transmission, this.imageURL)
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
			}
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