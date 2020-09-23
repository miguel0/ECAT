<template>
    <div>
        <b-navbar type='dark' variant='primary'>
            <b-navbar-brand href="#">ecat</b-navbar-brand>
            <b-navbar-nav class='ml-auto'>
                <template v-for='section in sections'>
                    <b-nav-item v-if='!section.children' :key='section.key' :href=section.route>{{section.name}}</b-nav-item>
                    <b-nav-item-dropdown v-else :key='section.key' :text="section.name" right>
                        <b-dropdown-item v-for='child in section.children' :key='child.key' :href='child.route'>{{child.name}}</b-dropdown-item>
                    </b-nav-item-dropdown>
                </template>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
        return {
            sections: [
                {
                    route: '/catalog',
                    name: 'Catálogos',
                    key: 'catalog'
                },
                {
                    name: 'Administración',
                    key: 'admin',
                    children: [
                        {
                            route: '/admin/datos',
                            name: 'Agregar Datos',
                            key: 'data'
                        },
                        {
                            route: '/admin/usuarios',
                            name: 'Manejo de Usuarios',
                            key: 'users'
                        }
                    ]
                },
                {
                    name: 'Manuel Córdoba', // TODO: change, hardcoded name,
                    key: 'user',
                    children: [
                        {
                            route: '/contraseña',
                            name: 'Cambiar Contraseña',
                            key: 'password'
                        },
                        {
                            route: '/',
                            name: 'Cerrar Sesión',
                            key: 'logout'
                        }
                    ]
                }
            ]
        }
    }
}
</script>
<style scoped>
.raw {
    border: 0;
    margin: 0;
    padding: 0;
}
.navbar-nav > li{
  padding-left: 20px;
}
</style>