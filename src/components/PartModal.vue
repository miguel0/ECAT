<template>
    <b-modal ref="partModal" size="lg" centered :hide-footer="true" :title="'Part no. ' + id_part">
        <Part v-if="id_part" :id_part="id_part" :from_component="from_component" :cpid="cpid"/>
    </b-modal>
</template>

<script>
import Part from '../components/Part';


export default {
    props: ['id_part', 'from_component', 'cpid'],
    components: {
        Part
    },
    methods: {
        showModal() {
            this.$refs.partModal.show();
        }
    }
}
</script>

<style scoped>
.test {
    overflow: hidden;
}
</style>