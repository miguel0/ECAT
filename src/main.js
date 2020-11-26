import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';
import router from './router/index';
import store from './store';
import { auth } from './firebase';
import dotenv from 'dotenv';
dotenv.config();

Vue.config.productionTip = false

let app;
auth.onAuthStateChanged(user => {
	if(!app) {
		app = new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#app')
	}

	if(user) {
		store.dispatch('fetchUserProfile', user)
	}
});
