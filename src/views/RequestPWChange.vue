<template>
	<div id="reqpwchange">
		<b-img id="logo" :src="at_motors_logo" center></b-img>

		<div id="content">
			<p>Ingrese su correo electrónico y se le enviará un enlace para cambiar la contraseña.</p>

			<b-form @submit="onSubmit">
				<b-form-group>
					<b-form-input id="top" class="input" v-model="form.email" type="email" placeholder="Correo electrónico" required autofocus></b-form-input>
                    <b-form-text text-variant="danger">Campo requerido</b-form-text>
				</b-form-group>

				<div id="request_btns">
					<b-button class="btns mr-3" v-on:click="goBack()">Atrás</b-button>
					<b-button class="btns ml-3" type="submit" variant="primary">Enviar correo</b-button>
				</div>
			</b-form>
		</div>
	</div>
</template>

<script>
export default {
	name: "RequestPWChange",
	data() {
		return {
            at_motors_logo: 'https://objectstorage.us-ashburn-1.oraclecloud.com/n/idh6hnyu8tqh/b/ECAT-OSB/o/assets%2Flogo_at_motors.png',
			form: {
				email: ''
			}
		}
	},
	methods: {
		goBack() {
			window.history.back();
		},
		onSubmit(evt) {
			evt.preventDefault();
			this.$store.dispatch('changePW', {
				email: this.form.email
			});
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
.btns {
	margin-top: 3%;
	min-width: 130px;
}
.input {
	position: relative;
	box-sizing: border-box;
	height: auto;
	padding: 10px;
	font-size: 16px;
}
#request_btns {
	flex-direction: row;
}
</style>
