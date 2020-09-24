<template>
    <div>
        <b-row>
            <b-col>
                <b-form-input :placeholder="searchPlaceHolder" type='search'></b-form-input><br>
                <b-list-group class="overflow-auto">
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
                },
                {
                    name: 'Miguel Barro',
                    phone: '+526444620514',
                    email: 'mail@mail.com',
                    position: 'Desarrollador de Software',
                    area: 'Ventas',
                    role: 'Consultor',
                    id: 2
                },
                {
                    name: 'Victor Zazueta',
                    phone: '+526444620514',
                    email: 'mail@mail.com',
                    position: 'Desarrollador de Software',
                    area: 'Ventas',
                    role: 'Administrador',
                    id: 3
                },
                {
                    name: 'Rogelio Félix',
                    phone: '+526444620514',
                    email: 'mail@mail.com',
                    position: 'Desarrollador de Software',
                    area: 'Ventas',
                    role: 'Consultor',
                    id: 4
                },
                {
                    name: 'Archie Andrews',
                    phone: '+526444620514',
                    email: 'mail@mail.com',
                    position: 'Desarrollador de Software',
                    area: 'Ventas',
                    role: 'Consultor',
                    id: 5
                },
                {
                    name: 'Betty Cooper',
                    phone: '+526444620514',
                    email: 'mail@mail.com',
                    position: 'Desarrollador de Software',
                    area: 'Ventas',
                    role: 'Consultor',
                    id: 6
                },
                {
                    name: 'Veronica Lodge',
                    phone: '+526444620514',
                    email: 'mail@mail.com',
                    position: 'Desarrollador de Software',
                    area: 'Ventas',
                    role: 'Consultor',
                    id: 7
                },
                {
                    name: 'Jughead Jones',
                    phone: '+526444620514',
                    email: 'mail@mail.com',
                    position: 'Desarrollador de Software',
                    area: 'Ventas',
                    role: 'Administrador',
                    id: 8
                },
                {
                    name: 'Cheryl Blossom',
                    phone: '+526444620514',
                    email: 'mail@mail.com',
                    position: 'Desarrollador de Software',
                    area: 'Ventas',
                    role: 'Consultor',
                    id: 9
                },
                {
                    name: 'Sabrina Spellman',
                    phone: '+526444620514',
                    email: 'mail@mail.com',
                    position: 'Desarrollador de Software',
                    area: 'Ventas',
                    role: 'Consultor',
                    id: 10
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
.overflow-auto {
	max-height: 550px;
}
</style>

