<template>
	<div id="pwchange">
		<form class="form-signin text-center">
			<img id="logo" class="mt-5" src="../assets/logo_at-motors.png" alt="" width="100%" height="auto">
			<div class="form">
				<label for="toppw" class="sr-only">Nueva Contraseña</label>
				<input id="toppw" type="password" class="form-control" placeholder="Nueva Contraseña" required autofocus>
				<label for="botpw" class="sr-only">Confirmar Nueva Contraseña</label>
				<input id="botpw" type="password" class="form-control" placeholder="Confirmar Nueva Contraseña" required>
				<button class="btn btn-lg btn-primary btn-block mt-3 mb-3" type="submit" v-on:click="PWChange()">Cambiar Contraseña</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	name: "PWChange",
	methods: {
		PWChange() {
			location.href = "/";
		}
	}
}
</script>

<style scoped>
#pwchange {
	display: flex;
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
.form-signin .form-control:focus {
	z-index: 2;
}
#toppw {
	margin-bottom: -1px;
	border-bottom-right-radius: 0;
	border-bottom-left-radius: 0;
}
#botpw {
	margin-bottom: 10px;
	border-top-left-radius: 0;
	border-top-right-radius: 0;
}
</style>
