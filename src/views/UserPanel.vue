<template>
    <div>
        <Navbar/>
        <template v-if="hasUsers()">
            <b-container>
                <b-row>
                    <b-col class="list">
                        <div>
                            <UserList @viewUser="getUser"
                                :users="this.users"
                            />
                        </div>
                    </b-col>
                    <b-col>
                        <template v-if="userIsSelected()">
                            <div class="profile">
                                <UserProfile
                                    :user="this.viewUser"
                                />
                            </div>
                        </template>
                    </b-col>
                </b-row>
            </b-container>
        </template>
        <template v-else>
            <br><br>
            <b-container>
                <b-row>
                    <b-col class="text-center">
                        <span class="text-secondary">
                            No hay usuarios en la base de datos.
                        </span>
                    </b-col>
                </b-row>
            </b-container>
        </template>

    </div>
</template>

<script>
import Navbar from '../components/Navbar'
import UserList from '../components/UserList'
import UserProfile from '../components/UserProfile'
import api from '../services/api/api';

export default {
    name: 'UserPanel',
    components: {
        Navbar,
        UserList,
        UserProfile
    },
    created: function () {
        api.usersApi.getAllUsers()
        .then(users => {
            this.users = users;
            this.convertRoles();
        })
        .catch(err => {
            console.log(err);
        })
    },
    data() {
        return {
            users: null,
            viewUser: null,
            roles: [
                { short: 'A', role: 'Admin' },
                { short: 'C', role: 'Consultor' }
            ]
        }
    },
    methods: {
        userIsSelected: function() {
            return this.viewUser != null;
        },
        hasUsers: function() {
            return this.users.length > 0;
        },
        convertRoles: function () {
            for (var user = 0; user < this.users.length; user++) {
                for (var role = 0; role < this.roles.length; role++) {
                    if (this.users[user].role.localeCompare(this.roles[role].short) == 0) {
                        this.users[user].role = this.roles[role].role
                    }
                }
            }
        },
        getUser: function (id) {
            api.usersApi.getUser(id)
            .then(user => {
                this.viewUser = user;
                this.viewUser.role = this.viewUser.role.localeCompare("C") == 0 ? "Consultor" : "Admin";
            })
            .catch(err => {
                console.log(err);
            })
        },
        getAllUsers: function() {
            //Retrieve all users from the db
            this.users =  api.usersApi.getAllUsers();
        }
    }
}
</script>

<style scoped>
.list {
    padding-top: 5%;
}
.profile {
    padding-top: 5%;
}
</style>