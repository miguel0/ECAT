<template>
    <div>
        <b-navbar type='dark' variant='primary'>
            <b-navbar-brand href="#">ecat</b-navbar-brand>
            <b-navbar-nav class="ml-auto">
                <b-nav-item href="#">Catálogos</b-nav-item>
                <b-nav-item href="#" disabled>Administración</b-nav-item>
                <!--<b-nav-item-dropdown text="Manuel Córdoba" right>
                    <b-dropdown-item href="#">Cambiar Contraseña</b-dropdown-item>
                    <b-dropdown-item href="#">Cerrar Sesión</b-dropdown-item>
                </b-nav-item-dropdown>-->
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
                    route: '/catalogos',
                    name: 'Catálogos',
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
                    name: 'Manuel Córdoba', // TODO: change, hardcoded name
                    children: [
                        {
                            route: '/contraseña',
                            name: 'Cambiar Contraseña'
                        },
                        {
                            route: '/',
                            name: 'Cerrar Sesión'
                        }
                    ]
                }
            ]
        }
    }
}
</script>