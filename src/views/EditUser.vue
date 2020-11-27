<template>
    <div>
        <Navbar />
        <div class="form-content p-5">
            <h3>Editando usuario</h3>
            <br>
            <b-form @submit="onSubmit">
                <b-form-group label="ID del usuario">
                    <b-form-input v-model="this.$route.params.id" readonly></b-form-input>
                </b-form-group>
                <b-form-group label="Nombre">
                    <b-form-input required v-model="name"></b-form-input>
                    <b-form-text text-variant="danger">Campo requerido</b-form-text>
                </b-form-group>
                <b-form-group label="Correo Electrónico">
                    <b-form-input required v-model="email" type="email"></b-form-input>
                    <b-form-text text-variant="danger">Campo requerido</b-form-text>
                </b-form-group>
                <b-form-group label="Rol">
                    <b-form-select v-model="role" :options="roles"></b-form-select>
                </b-form-group>
                <b-form-group label="Teléfono">
                    <b-form-input v-model="tel"></b-form-input>
                </b-form-group>
                <b-form-group label="Puesto">
                    <b-form-input v-model="position"></b-form-input>
                </b-form-group>
                <b-form-group label="Área">
                    <b-form-input v-model="area"></b-form-input>
                </b-form-group>

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
import ConfirmationModal from '../components/ConfirmationModal';

export default {
    name: "EditUser",
    data() {
        return {
            name: null,
            tel: null,
            email: null,
            position: null,
            area: null,
            role: null,
            roles: [
                { value: 'A', text: 'Admin' },
                { value: 'C', text: 'Consultor' }
            ]
        }
    },
    components: {
        Navbar,
        ConfirmationModal
    },
    created: function() {
        api.usersApi.getUser(this.$route.params.id)
        .then(user => {
            this.name = user.name ? user.name : '';
            this.tel = user.tel ? user.tel : '';
            this.email = user.email ? user.email : '';
            this.position = user.position ? user.position : '';
            this.area = user.area ? user.area : '';
            this.role = user.role ? user.role : '';
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

        confirm: function(){
            api.usersApi.editUser(this.$route.params.id, this.name, this.role, this.tel, this.position, this.area, this.email)
            .then(res => {
                if(res === true) {
                    window.history.back();
                } else if(res.includes('value too large for column')) {
                    this.$bvModal.msgBoxOk('Uno de los campos es muy largo, trate de modificarlo para que sea más corto.', {centered: true});
                } else {
                    this.$bvModal.msgBoxOk(`Ocurrió un error. ${res}`, {centered: true});
                }
            })
            .catch(err => {
                this.$bvModal.msgBoxOk(err.message, {centered: true});
                this.cancelConfirmation();
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