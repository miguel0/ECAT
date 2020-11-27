<template>
    <div>
        <b-modal ref="confirmationModal" size="lg" :hide-footer="true" :title="title[mode]" centered>
            <h1>¿Está seguro?</h1>
            <h3>{{message[mode]}}</h3>

            <div class="separate">
                <b-button class="mt-4" variant="secondary btn-lg" @click="cancelConfirmation()">{{btnCancel}}</b-button>
                <b-button class="mt-4" :variant="variant[mode]" @click="confirm()">{{btnConfirm[mode]}}</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'ConfirmationModal',
    props: ['mode'],
    methods: {
        confirm() {
            this.$emit('onConfirm');
        },
        cancelConfirmation() {
            this.$emit('onCancel');
        },
        showModal() {
            this.$refs.confirmationModal.show();
        },
        hideModal() {
            this.$refs.confirmationModal.hide();
        }
    },
    data() {
        return {
            title: {
                edit: "Confirmación de edición",
                delete: "Confirmación de eliminación",
                add: "Confirmación de inserción"
            },
            message: {
                edit: "Los datos podrían no recuperarse tras realizar esta acción.",
                delete: "Los datos podrían no recuperarse tras realizar esta acción.",
                add: "Asegúrese de que los datos sean correctos."
            },
            btnCancel: "Cancelar",
            btnConfirm: {
                edit: "Confirmar y editar",
                delete: "Confirmar y eliminar",
                add: "Confirmar y subir"
            },
            variant: {
                edit: "warning btn-lg",
                delete: "danger btn-lg",
                add: "primary btn-lg"
            }
        }
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
</style>