<template>
    <div>
        <b-modal id="modal-confirmation" title="CONFIRMAR" hide-footer>  
            <head>
                ¿Está seguro?
            </head>
            
            <h1>
                Los datos no podrán recuperarse tras realizar esta acción.
            </h1>

            <b-button class="mt-3" variant="btn btn-secondary" block @click="cancelConfirmation">Cancelar</b-button>
            <b-button class="mt-2" variant="btn btn-danger" block @click="acceptConfirmation">Aceptar</b-button>
        </b-modal>
    </div>
</template>

<script>
export default {
    methods: {
        cancelConfirmation() {
            
        },

        acceptConfirmation() {
            
        }
    }
}
</script>

<style scoped>

</style>