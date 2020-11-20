<template>
    <div>
        <div class="text-center">
            <b-avatar size="8em" variant="primary"></b-avatar>
            <br><br>
            <h4>{{this.user.name}}</h4>
        </div>
        <br>
        <b-form-group label="Correo Electrónico" v-if="this.user.email">
            <b-form-input v-model="this.user.email" readonly></b-form-input>
        </b-form-group>
        <b-form-group label="Rol">
            <b-form-input v-model="this.user.role" readonly></b-form-input>
        </b-form-group>
        <b-form-group label="Teléfono" v-if="this.user.tel">
            <b-form-input v-model="this.user.tel" readonly></b-form-input>
        </b-form-group>
        <b-form-group label="Puesto" v-if="this.user.position">
            <b-form-input v-model="this.user.position" readonly></b-form-input>
        </b-form-group>
        <b-form-group label="Área" v-if="this.user.area">
            <b-form-input v-model="this.user.area" readonly></b-form-input>
        </b-form-group>
        <template>
            <b-button size="sm" @click="editUser(user.id)" variant="primary" class="m-1">
                <img src="../assets/img/bxs-edit.svg" />
            </b-button>

            <b-button size="sm" @click="confirm()" variant="danger" class="m-1">
                <img src="../assets/img/bxs-trash.svg" />
            </b-button>
        </template>

        <b-modal ref="confirmationModal" size="lg" :hide-footer="true" title="Confirmación de eliminación">
            <h1>
                ¿Está seguro?
            </h1>

            <h3>
                Los datos podrían no recuperarse tras realizar esta acción.
            </h3>

            <div class="separate">
                <b-button class="mt-4" variant="secondary btn-lg" @click="cancelConfirmation()">Cancelar</b-button>
                <b-button class="mt-4" variant="danger btn-lg" @click="deleteUser(user.id)">Confirmar y eliminar</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>

import api from "../services/api/api";

export default {
    name: 'UserProfile',
    props: ['user'],
    data() {
        return {
        }
    },
    methods: {
        editUser: function(id) {
            location.href = '/edituser/' + id;
        },
        deleteUser: function (id) {
            api.usersApi.deleteUser(id)
                .then(res => {
                    if(res === true) {
                        location.reload();
                    } else {
                        alert("Ocurrió un error." + res + this.user.name);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        confirm: function(){
            this.$refs.confirmationModal.show();
        },
        cancelConfirmation: function(){
            this.$refs.confirmationModal.hide();
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