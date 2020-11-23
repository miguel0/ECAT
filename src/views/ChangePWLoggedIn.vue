<template>
	<div id="signin">
		<Navbar />

		<div id="content">
			<h2 id="title">Cambiar contraseña</h2>

			<b-form @submit="onSubmit">
				<b-form-group>
					<b-form-input class="input" v-model="curpw" type="password"
					placeholder="Contraseña actual" required autofocus></b-form-input>
				</b-form-group>

				<b-form-group>
					<b-form-input id="top" class="input" v-model="newpw" type="password"
					placeholder="Nueva contraseña" required></b-form-input>
				</b-form-group>

				<b-form-group>
					<b-form-input id="bottom" class="input" v-model="confnewpw" type="password"
					placeholder="Confirmar nueva contraseña" required></b-form-input>
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
import * as fb from 'firebase';

export default {
	name: "SignIn",
	components: {
		Navbar
	},
	data() {
		return {
            curpw: '',
            newpw: '',
            confnewpw: ''
		}
	},
	methods: {
        authenticateCurrentPassword: async function() {
            let user = fb.auth().currentUser;
            let credential = fb.auth.EmailAuthProvider.credential(
                fb.auth().currentUser.email,
                this.curpw
            );
            user.reauthenticateWithCredential(credential)
            .then(function() {
                console.log("simon");
                return true;
            })
            .catch(function(err) {
                console.log(err);
            });
        },
		goBack: function() {
			window.history.back();
		},
		onSubmit: function(evt) {
            if (this.newpw.localeCompare(this.confnewpw) !== 0) {
                alert("Las contraseñas no coinciden.")
            } else {
                evt.preventDefault();
                let user = fb.auth().currentUser;
                let credential = fb.auth.EmailAuthProvider.credential(
                    fb.auth().currentUser.email,
                    this.curpw
                );
                user.reauthenticateWithCredential(credential)
                .then(() => {
                        fb.auth().currentUser.updatePassword(this.newpw)
                        .then(() => {
                            alert("Contraseña actualizada con éxito.");
                            window.history.back();
                        })
                        .catch(err => {
                            console.log(err);
                            alert("Error al actualizar la contraseña.");
                        })
                })
                .catch((err) => {
                    console.log(err);
                    alert("Error al autenticar la contraseña.");
                });
            }
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
