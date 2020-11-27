<template>
    <div>
        <Navbar />
        <div class="text-center">
            <br><br>
            <b-avatar size="8em" variant="primary"></b-avatar>
            <br><br>
            <h4>Agregando usuario</h4>
        </div>
        <div class="form-content p-5">
            <b-form @submit="onSubmit">
                <b-form-group label="Nombre">
                    <b-form-input required v-model="name"></b-form-input>
                    <b-form-text text-variant="danger">Campo requerido</b-form-text>
                </b-form-group>
                <b-form-group label="Correo Electrónico">
                    <b-form-input required v-model="email" type="email"></b-form-input>
                    <b-form-text text-variant="danger">Campo requerido</b-form-text>
                </b-form-group>
                <b-form-group label="Contraseña">
                    <b-form-input v-model="password" type="password"></b-form-input>
                </b-form-group>
                <b-form-group label="Confirmar contraseña">
                    <b-form-input v-model="confPassword" type="password"></b-form-input>
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
            mode="add"
            ref="modalC"
            @onConfirm="confirm()"
            @onCancel="cancelConfirmation()"
        />
        
    </div>
</template>

<script>
import Navbar from "../components/Navbar";
import api from '../services/api/api';
import ConfirmationModal from '../components/ConfirmationModal';

export default {
    name: "AddUser",
    data() {
        return {
            name: null,
            tel: null,
            email: null,
            position: null,
            area: null,
            role: 'C',
            password: null,
            confPassword: null,
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
    methods: {
        onSubmit: function(evt) {
            evt.preventDefault();
            if (this.password.localeCompare(this.confPassword) != 0) {
                this.$bvModal.msgBoxOk("Las contraseñas no coinciden.", {centered: true});
            } else {
                this.$refs.modalC.showModal();
            }
        },

        confirm: function(){
            api.usersApi.addUser(this.name, this.role, this.tel, this.position, this.area, this.email, this.password)
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