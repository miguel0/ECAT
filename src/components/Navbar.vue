<template>
	<div>
		<b-navbar type='dark' class="atblue">
            <div class="logo" v-on:click=toHome()>
                <b-img :src="at_motors_logo" height="40"></b-img>
            </div>
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
            at_motors_logo: 'https://objectstorage.us-ashburn-1.oraclecloud.com/n/idh6hnyu8tqh/b/ECAT-OSB/o/assets%2Flogo_at_motors.png',
			sections: [
				{
					route: '/home',
					name: 'Búsqueda'
				},
				{
					name: 'Usuario',
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
        toHome() {
            location.href = "/home";
        },
		dropdownClick(str) {
			if (str === 'logout') {
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
				this.sections[1].name = data.name;

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
                                route: '/addimages',
                                name: 'Agregar imágenes'
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
			this.$bvModal.msgBoxOk(err.message, {centered: true});
		});
	}
}
</script>
<style scoped>
.logo {
    cursor: pointer;
}
.raw {
	border: 0;
	margin: 0;
	padding: 0;
}
.navbar-nav > li{
	padding-left: 20px;
}
.atblue{
	color: #1f3564;
	background-color: #1f3564;
}
</style>