<template>
    <div>
        <b-table 
            id="partTable" 
            hover 
            :items='parts' 
            :fields='fields'
            per-page="5"
            :current-page="currentPage"
            @row-clicked="openModal"
        >

        <template #cell(buttons)="">
            <b-button size="sm" @click="editPart()" class="btn btn-primary mr-1 mb-2">
                <img src="../assets/img/bxs-edit.svg" />
            </b-button>

            <b-button size="sm" @click="deletePart()" class="btn btn-danger mr-1">
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

        <b-modal ref="partModal" size="lg" :hide-footer="true" title="Vista de parte">
            <Part v-if="selectedPart" :id_part="selectedPart"/>
        </b-modal>
    </div>
</template>

<script>
import Part from '../components/Part';

export default {
    name: "PartList",
    props: ['parts'],
    components: {
        Part
    },
    data() {
        return {
            fields: [
                {
                    key: 'localNo',
                    label: 'No.'
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
                    label: 'Actions'
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

        editPart() {
            console.log('Editado');
        },

        deletePart() {
            console.log('Eliminado');
        }
    }
}
</script>