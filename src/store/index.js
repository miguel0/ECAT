import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '../firebase';
import router from '../router/index';
import api from '../services/api/api';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		userProfile: {}
	},
	mutations: {
		setUserProfile(state, val) {
			state.userProfile = val;
		}
	},
	actions: {
		async login({ dispatch }, form) {
			// sign user in
			const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password);
			// fetch user profile and set in state
			dispatch('fetchUserProfile', user);
		},
		async fetchUserProfile({ commit }, user) {
			
			if (!user.uid) {
				logout(commit);
			} else {
				// fetch user profile
				
				//console.log("calling db...");
				await api.usersApi.getUser(user.uid).then(data => {
					if (!data.id) {
						logout(commit);
					} else {
						// set user profile state
						commit('setUserProfile', data);

						// change route to dashboard
						if (router.currentRoute.path === '/') {
							router.push('/home')
						}
					}
				}).catch(err => {
					//console.log("something wrong? commit: ", commit);
					logout(commit);
					console.log(err);
				});
			}
		},
		async logout({ commit }) {
			//console.log("mid one?");
			logout(commit);
		},
		async changePW(_, form) {
			return fb.auth.sendPasswordResetEmail(form.email).then(function() {
				// Email sent.
				return '¡Se ha enviado un correo para cambiar su contraseña!'
			});
		}
	}
});

async function logout(commit) {
	//console.log("entered lougout");
	// log user out
	await fb.auth.signOut();

	// clear user data from state
	commit('setUserProfile', {});

	// redirect to login view
	//console.log("forcing logout: ", router.currentRoute.path);
	if (router.currentRoute.path != '/') {
		//console.log("redirecting to login?")
		router.push('/')
	}
}

export default store;