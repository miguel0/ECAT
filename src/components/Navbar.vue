<template>
    <div>
        <b-navbar type='dark' variant='primary'>
            <b-navbar-brand href="#">ecat</b-navbar-brand>
            <b-navbar-nav class='ml-auto'>
                <template v-for='(section, index) in sections'>
                    <b-nav-item v-if='!section.children' :key="`section-${index}`" :href=section.route>{{section.name}}</b-nav-item>
                    <b-nav-item-dropdown v-else :key="`section-${index}`" :text="section.name" right>
                        <b-dropdown-item v-for='(child, i) in section.children' :key="`child-${i}`" :href='child.route'>{{child.name}}</b-dropdown-item>
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
                    name: 'Catálogos'
                },
                {
                    name: 'Administración',
                    children: [
                        {
                            route: '/admin/datos',
                            name: 'Agregar Datos'
                        },
                        {
                            route: '/admin/usuarios',
                            name: 'Manejo de Usuarios'
                        }
                    ]
                },
                {
                    name: 'Manuel Córdoba', // TODO: change, hardcoded name,
                    children: [
                        {
                            route: '/contraseña',
                            name: 'Cambiar Contraseña',
                        },
                        {
                            route: '/',
                            name: 'Cerrar Sesión',
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