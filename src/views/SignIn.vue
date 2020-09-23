<template>
	<div id="signin">
		<form class="form-signin text-center">
			<img id="logo" class="mt-5 img-fluid" src="../assets/logo_at-motors.png" alt="" width="200%" height="auto">
			<div class="form">
				<label for="inputEmail" class="sr-only">Correo electrónico</label>
				<input type="email" id="inputEmail" class="form-control" placeholder="Correo electrónico" required autofocus>
				<label for="inputPassword" class="sr-only">Contraseña</label>
				<input type="password" id="inputPassword" class="form-control" placeholder="Contraseña" required>
				<button class="btn btn-lg btn-primary btn-block mt-3 mb-3" type="submit">Iniciar Sesión</button>
				<a href="#">¿Olvidaste tu contraseña?</a>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	name: "SignIn"
}
</script>

<style scoped>
#signin {
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
.form-signin input[type="email"] {
	margin-bottom: -1px;
	border-bottom-right-radius: 0;
	border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
	margin-bottom: 10px;
	border-top-left-radius: 0;
	border-top-right-radius: 0;
}
</style>
