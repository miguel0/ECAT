<template>
	<div id="signin">
		<b-img id="logo" src="../assets/logo_at-motors.png" center></b-img>

		<div id="content">
			<b-form @submit="onSubmit">
				<b-form-group>
					<b-form-input id="top" class="input" v-model="form.email" type="email" placeholder="Correo electrónico" required autofocus></b-form-input>
				</b-form-group>

				<b-form-group>
					<b-form-input id="bottom" class="input" v-model="form.password" type="password" placeholder="Contraseña" required></b-form-input>
				</b-form-group>		

				<b-button id="submit" type="submit" variant="primary">Iniciar sesión</b-button>		
			</b-form>
			<div id="link">
				<b-link href="/requestpwchange">¿Olvidaste tu contraseña?</b-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "SignIn",
	data() {
		return {
			form: {
				email: '',
				password: ''
			}
		}
	},
	methods: {
		onSubmit(evt) {
			evt.preventDefault();
			console.log("log in details: " + this.form.email + " " + this.form.password);
		}
	}
}
</script>

<style scoped>
#signin {
	display: flex;
	flex-direction: column;
}
#logo {
	padding-top: 5%;
}
#content {
	padding-top: 8%;
	width: 100%;
	max-width: 330px;
	margin: auto;
	text-align: center;
	position: relative;
}
#top {
	margin-bottom: -17px;
	border-bottom-right-radius: 0;
	border-bottom-left-radius: 0;
}
#bottom {
	border-top-left-radius: 0;
	border-top-right-radius: 0;
}
#submit {
	margin-top: 10%;
}
#link {
	margin-top: 5%;
}
.input {
	position: relative;
	box-sizing: border-box;
	height: auto;
	padding: 10px;
	font-size: 16px;
}
.input:focus {
	z-index: 2;
}
</style>
