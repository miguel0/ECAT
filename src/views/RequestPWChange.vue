<template>
	<div id="requestpwchange">
		<form class="form-signin text-center">
			<img id="logo" class="mt-5" src="../assets/logo_at-motors.png" alt="" width="100%" height="auto">
			<div class="form">
				<p>Ingrese su correo electrónico y se le enviará un enlace para cambiar la contraseña.</p>
				<label for="inputEmail" class="sr-only">Correo electrónico</label>
				<input type="email" id="inputEmail" class="form-control" placeholder="Correo electrónico" required autofocus>
				<button class="btn btn-lg btn-primary btn-block mt-3 mb-3" type="submit" v-on:click="requestPWChange()">Enviar Correo</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	name: "RequestPWChange",
	methods: {
		requestPWChange() {
			location.href = "/pwchange";
		}
	}
}
</script>

<style scoped>
#requestpwchange {
	display: flex;
}
p {
	font-size: 15px;
}
.form {
	padding-top: 40%;
}
.form-signin {
	width: 100%;
	max-width: 330px;
	padding: 15px;
	margin: auto;
}
.form-signin .form-control {
	position: relative;
	box-sizing: border-box;
	height: auto;
	padding: 10px;
	font-size: 16px;
}
.form-signin input[type="email"] {
	margin-bottom: -1px;
}
</style>
