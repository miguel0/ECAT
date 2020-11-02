<template>
    <div>
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

        <template #cell(buttons)="row">
            <b-button size="sm" @click="editPart(row.item.id)" variant="primary" class="m-1">
                <img src="../assets/img/bxs-edit.svg" />
            </b-button>

            <b-button size="sm" @click="deletePart(row.item.cpid)" variant="danger" class="m-1">
                <img src="../assets/img/bxs-trash.svg" />
            </b-button>
        </template>

        </b-table>

        <b-pagination
            v-model="currentPage"
            per-page="5"
            aria-controls="partTable"
            :total-rows="parts.length"
        >
        </b-pagination>

        <b-modal ref="partModal" size="lg" :hide-footer="true" :title="'Part no. ' + selectedPart">
            <Part v-if="selectedPart" :id_part="selectedPart"/>
        </b-modal>
    </div>
</template>

<script>
import Part from '../components/Part';
import api from '../services/api/api';

export default {
    name: "PartList",
    props: ['parts'],
    components: {
        Part
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
                },
                {
                    key: 'buttons',
                    label: 'Acciones'
                }
            ],
            currentPage: 1,
            selectedPart: null
        }
    },
    methods: {
        openModal(row) {
            this.selectedPart = row.id;
            this.$refs.partModal.show();
        },

        editPart(id) {
            location.href = '/editpart/' + id;
        },

        deletePart(id) {
			api.componentPartsApi.deleteComponentPart(id)
			.then(res => {
				if(res === true) {
					location.reload();
				} else if(res.includes('child record found')) {
					alert('No puede borrar una pieza con subpiezas. Trate borrando esas primero.');
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