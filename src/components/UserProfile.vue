<template>
    <div>
        <div class="text-center">
            <b-avatar size="8em" variant="primary"></b-avatar>
            <br><br>
            <h4>{{testUser.name}}</h4>
        </div>
        <br>
        <b-form-group label="Teléfono">
            <b-form-input v-model="testUser.phone" readonly></b-form-input>
        </b-form-group>
        <b-form-group label="Correo Electrónico">
            <b-form-input v-model="testUser.email" readonly></b-form-input>
        </b-form-group>
        <b-form-group label="Puesto">
            <b-form-input v-model="testUser.position" readonly></b-form-input>
        </b-form-group>
        <b-form-group label="Área">
            <b-form-input v-model="testUser.area" readonly></b-form-input>
        </b-form-group>
        <b-form-group label="Rol">
            <b-form-input v-model="testUser.role" readonly></b-form-input>
        </b-form-group>

    </div>
</template>

<script>
export default {
    name: 'UserProfile',
    data() {
        return {
            testUser: {
                name: 'Luis Wilson',
                phone: '+526444620514',
                email: 'mail@mail.com',
                position: 'Desarrollador de Software',
                area: 'Ventas',
                role: 'Consultor',
                id: 0
                
            }
        }
    }
}
</script>