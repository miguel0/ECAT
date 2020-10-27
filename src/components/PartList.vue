<template>
    <div>
        <b-table 
            id="partTable" 
            hover 
            :items='parts' 
            :fields='fields'
            per-page="5"
            :current-page="currentPage"
        ></b-table>
        <b-pagination
            v-model="currentPage"
            per-page="5"
            aria-controls="partTable"
            :total-rows="parts.length"
        ></b-pagination>
    </div>
</template>

<script>

export default {
    name: "PartList",
    props: ['parts'],
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
                }
            ],
            currentPage: 1
        }
    }
}
</script>