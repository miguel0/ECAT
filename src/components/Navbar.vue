<template>
	<div>
		<b-navbar type='dark' variant='primary'>
			<b-navbar-brand href="/home">ecat</b-navbar-brand>
			<b-navbar-nav class='ml-auto'>
				<template v-for='(section, index) in sections'>
					<b-nav-item v-if='!section.children' :key="`section-${index}`" :href=section.route>{{section.name}}</b-nav-item>
					<b-nav-item-dropdown v-else :key="`section-${index}`" :text="section.name" right>
						<b-dropdown-item v-for='(child, i) in section.children' :key="`child-${i}`" @click='dropdownClick(child.route)'>{{child.name}}</b-dropdown-item>
					</b-nav-item-dropdown>
				</template>
			</b-navbar-nav>
		</b-navbar>
	</div>
</template>

<script>
import * as fb from '../firebase';
import api from '../services/api/api';

export default {
	name: 'Navbar',
	data() {
		return {
			sections: [
				{
					route: '/home',
					name: 'Búsqueda'
				},
				{
					name: 'Manuel Córdoba', // TODO: change, hardcoded name,
					children: [
						{
							route: '/changepwli',
							name: 'Cambiar contraseña',
						},
						{
							route: 'logout',
							name: 'Cerrar sesión',
						}
					]
				}
			]
		}
	},
	methods: {
		dropdownClick(str) {
			if (str == 'logout') {
				this.$store.dispatch('logout');
			} else {
				location.href = str;
			}			
		}
	},
	created() {
		api.usersApi.getUser(fb.auth.currentUser.uid)
		.then(data => {
			if (data.role) {
				const isAdmin = data.role === 'A' ? true : false;
				
				if (isAdmin) {
					this.sections.splice(1, 0, {
						name: 'Administración',
						children: [
							{
								route: '/adddatafile',
								name: 'Agregar datos con un archivo'
							},
							{
								route: '/adddatamanual',
								name: 'Agregar una parte manualmente'
							},
							{
								route: '/users',
								name: 'Manejo de usuarios'
							}
						]
					});
				}
			}
		})
		.catch(err => {
			console.log(err);
		});
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