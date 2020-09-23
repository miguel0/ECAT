<template>
	<div id="reqpwchange">
		<b-img id="logo" src="../assets/logo_at-motors.png" center></b-img>

		<div id="content">
			<p>Ingrese su correo electrónico y se le enviará un enlace para cambiar la contraseña.</p>

			<b-form @submit="onSubmit">
				<b-form-group>
					<b-form-input id="top" class="input" v-model="form.email" type="email" placeholder="Correo electrónico" required autofocus></b-form-input>
				</b-form-group>
				<b-button id="submit" type="submit" variant="primary">Enviar correo</b-button>		
			</b-form>
		</div>
	</div>
</template>

<script>
export default {
	name: "RequestPWChange",
	data() {
		return {
			form: {
				email: ''
			}
		}
	},
	methods: {
		onSubmit(evt) {
			evt.preventDefault();
			console.log("email to change pw: " + this.form.email);
			location.href = "/pwchange";
		}
	}
}
</script>

<style scoped>
#reqpwchange {
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
#submit {
	margin-top: 5%;
}
.input {
	position: relative;
	box-sizing: border-box;
	height: auto;
	padding: 10px;
	font-size: 16px;
}
</style>
