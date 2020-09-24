<template>
    <div>
        <br>
        <b-row>
            <b-col>
                <b-form-input :placeholder="searchPlaceHolder" type='search'></b-form-input><br>
                <b-list-group>
                    <b-list-group-item v-for="(user) of sampleUsers" :key="`user_id-${user.id}`" ref="ref-users" class="clickable d-flex align-items-center">
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
    data() {
        return {
            sampleUsers: [
                {
                    name: 'Luis Wilson',
                    phone: '+526444620514',
                    email: 'mail@mail.com',
                    position: 'Desarrollador de Software',
                    area: 'Ventas',
                    role: 'Consultor',
                    id: 0
                },
                {
                    name: 'Carlos López',
                    phone: '+526444620514',
                    email: 'mail@mail.com',
                    position: 'Desarrollador de Software',
                    area: 'Ventas',
                    role: 'Consultor',
                    id: 1
                }
            ],
            searchPlaceHolder: 'Busca usuarios por nombre...'
        }
    },
    methods: {
        viewUser: function(id) {
            console.log("user id: ", id);
        }
    }
}
</script>

<style scoped>
.clickable {
    cursor: pointer;
}
</style>

