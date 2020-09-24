<template>
	<div id="signin">
		<Navbar />

		<div id="content">
			<h2 id="title">Cambiar contraseña</h2>

			<b-form @submit="onSubmit">
				<b-form-group>
					<b-form-input class="input" v-model="form.curpw" type="password"
					placeholder="Contraseña actual" required autofocus></b-form-input>
				</b-form-group>

				<b-form-group>
					<b-form-input id="top" class="input" v-model="form.newpw" type="password"
					placeholder="Nueva Contraseña" required></b-form-input>
				</b-form-group>

				<b-form-group>
					<b-form-input id="bottom" class="input" v-model="form.confnewpw" type="password"
					placeholder="Confirmar Nueva Contraseña" required></b-form-input>
				</b-form-group>		

				<div id="pw_btns">
					<b-button class="btns mr-3" v-on:click="goBack()">Atrás</b-button>
					<b-button class="btns ml-3" type="submit" variant="primary">Confirmar</b-button>
				</div>
			</b-form>
		</div>
	</div>
</template>

<script>
import Navbar from '../components/Navbar';

export default {
	name: "SignIn",
	components: {
		Navbar
	},
	data() {
		return {
			form: {
				curpw: '',
				newpw: '',
				confnewpw: ''
			}
		}
	},
	methods: {
		goBack() {
			window.history.back();
		},
		onSubmit(evt) {
			evt.preventDefault();
			console.log("Cur PW " + this.form.curpw + " New PW: " + this.form.newpw + " " + this.form.confnewpw);
			location.href = "/catalog";
		}
	}
}
</script>

<style scoped>
#signin {
	display: flex;
	flex-direction: column;
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
#title {
	margin-bottom: 20%;
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
.btns {
	margin-top: 3%;
	min-width: 120px;
}
#request_btns {
	flex-direction: row;
}
</style>
