import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '../firebase';
import router from '../router/index';

Vue.use(Vuex);

export default new Vuex.Store({
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
			// fetch user profile
			const userProfile = user; // TODO: get user from db

			// set user profile in state
			commit('setUserProfile', userProfile);
			
			// change route to dashboard
			router.push('/catalog');
		},
		async logout({ commit }) {
			// log user out
			await fb.auth.signOut();

			// clear user data from state
			commit('setUserProfile', {});

			// redirect to login view
			router.push('/');
		},
		async checkLoggedIn() {
			if(this.state.userProfile != null) {
				router.push('/catalog');
			}
		},
	}
});