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

        <ConfirmationModal
            mode="delete"
            ref="modalC"
            @onConfirm="deleteUser(user.id)"
            @onCancel="cancelConfirmation()"
        />
        
    </div>
</template>

<script>

import api from "../services/api/api";
import ConfirmationModal from './ConfirmationModal';

export default {
    name: 'UserProfile',
    props: ['user'],
    data() {
        return {
        }
    },
    components: {
        ConfirmationModal
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
            this.$refs.modalC.showModal();
        },
        cancelConfirmation: function(){
            this.$refs.modalC.hideModal();
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