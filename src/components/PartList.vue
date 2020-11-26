<template>
	<div v-if="parts && parts.length > 0">
		<b-table 
			id="partTable" 
			hover
			small
			:items='parts' 
			:fields='fields'
			per-page="5"
			:current-page="currentPage"
			:sort-by.sync="sortBy"
			:sort-desc.sync="sortDesc"
			@row-clicked="openModal"
		>

		<template v-if="isAdmin" #cell(buttons)="row">
			<b-button size="sm" @click="editPart(row)" variant="primary" class="m-1">
				<img src="../assets/img/bxs-edit.svg" />
			</b-button>

			<b-button size="sm" @click="confirm(row)" variant="danger" class="m-1">
				<img src="../assets/img/bxs-trash.svg" />
			</b-button>
		</template>

		</b-table>

		<b-pagination id="pag"
			v-model="currentPage"
			per-page="5"
			aria-controls="partTable"
			:total-rows="parts.length"
		>
		</b-pagination>

        <PartModal 
            ref="modalP"
            :id_part="selectedPart"
        />

		<b-modal ref="confirmationModal" size="lg" :hide-footer="true" title="Confirmación de eliminación">
			<h1>
				¿Está seguro?
			</h1>
			
			<h3>
				Los datos podrían no recuperarse tras realizar esta acción.
			</h3>

			<div class="separate">
				<b-button class="mt-4" variant="secondary btn-lg" @click="cancelConfirmation()">Cancelar</b-button>
				<b-button class="mt-4" variant="danger btn-lg" @click="deletePart(selectedPart)">Confirmar y eliminar</b-button>
			</div>
		</b-modal>
    </div>
	<div v-else>
		<br><br>
		<b-row class="text-center">
			<b-col>
				<span class="text-secondary">
					No hay partes asociadas a este componente.
				</span>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import api from '../services/api/api';
import PartModal from './PartModal';
import * as fb from '../firebase';

export default {
    name: "PartList",
    props: ['parts'],
    components: {
        PartModal
    },
    data() {
        return {
			sortBy: 'localNo',
			sortDesc: false,
			fields: [
				{
					key: 'localNo',
					label: 'No.',
					sortable: true
				},
				{
					key: 'id',
					label: 'PartNo.'
				},
				{
					key: 'name',
					label: 'Part Name'
				},
				{
					key: 'chName',
					label: '名称'
				},
				{
					key: 'spName',
					label: 'Nombre de Parte'
				},
				{
					key: 'otherName',
					label: 'Nombre de Parte (Alterno)'
				},
				{
					key: 'localQty',
					label: 'Qty'
				},
				{
					key: 'remark',
					label: 'Remark'
				}
			],
			currentPage: 1,
			selectedPart: null
		}
	},
	methods: {
		openModal(row) {
			this.selectedPart = row.id;
			this.$refs.modalP.showModal();
		},

		editPart(row) {
			location.href = '/editpartfromcomponent/' + row.item.cpid + "/" + row.item.id;
		},

		deletePart(id) {
			api.componentPartsApi.deleteComponentPart(id)
			.then(res => {
				if(res === true) {
					location.reload();
				} else if(res.includes('child record found')) {
					alert('No puede borrar una pieza con subpiezas. Trate borrando esas primero.');
				} else {
					alert("Ocurrió un error." + res + this.selectedPart);
				}
			})
			.catch(err => {
				console.log(err);
			});
		},
		confirm: function(row){
			this.selectedPart = row.item.cpid;
			this.$refs.confirmationModal.show();
		},
		cancelConfirmation: function(){
			this.$refs.confirmationModal.hide();
		},
	},
	created() {
		api.usersApi.getUser(fb.auth.currentUser.uid)
		.then(data => {
			if (data.role) {
				this.isAdmin = data.role === 'A' ? true : false;
				
				if (this.isAdmin) {
					this.fields.push({
						key: 'buttons',
						label: 'Acciones'
					});
				}
			}
		})
		.catch(err => {
			console.log(err);
		});
	}
}
</script>

<style scoped>
.separate{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
#pag{
	position: relative;
	z-index: 1;
}
</style>