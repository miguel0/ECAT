<template>
    <div>
        <b-row>
            <b-col sm="9">
                <b-form-input v-model="searched" :placeholder="searchPlaceHolder" type='search'></b-form-input><br>
            </b-col>
            <b-col sm="3">
                <b-button @click="addUser()" variant="primary">
                    Agregar
                </b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-list-group class="overflow-auto">
                    <b-list-group-item
                        href="#"
                        @click="viewUser(user.id)"
                        v-for="(user) of filter()"
                        :key="`user_id-${user.id}`"
                        ref="ref-users"
                        class="clickable d-flex align-items-center"
                    >
                            <b-avatar variant="primary" class="mr-3" :text="user.name[0]"></b-avatar>
                            <span class="mr-auto">{{user.name}}</span>
                            <b-badge>{{user.role}}</b-badge>
                    </b-list-group-item>
                </b-list-group>
            </b-col>
        </b-row>
    </div>
        
</template>

<script>
export default {
    name: 'UserList',
    props: ['users'],
    data() {
        return {
            searchPlaceHolder: 'Busca usuarios por nombre...',
            searched: ''
        }
    },
    methods: {
        viewUser: function(id) {
            this.$emit('viewUser', id);
        },
        addUser: function() {
            location.href = '/adduser/';
        },
        filter: function () {
            let results = [];
            for (let index = 0; index < this.users.length; index++) {
                if (this.users[index].name.includes(this.searched)) {
                    results.push(this.users[index]);
                }
            }
            return results;
        }
    }
}
</script>

<style scoped>
.clickable {
    cursor: pointer;
}
.overflow-auto {
	max-height: 550px;
}
</style>

