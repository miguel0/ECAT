import Vue from 'vue';
import VueRouter from 'vue-router';
import { auth } from '../firebase';

import SignIn from '../views/SignIn';
import Home from '../views/Home';
import Catalog from '../views/Catalog';
import RequestPWChange from '../views/RequestPWChange.vue';
import PWChange from '../views/PWChange.vue';
import AddData from '../views/AddData.vue';
import ChangePWLoggedIn from '../views/ChangePWLoggedIn.vue';
import UserPanel from '../views/UserPanel';
import DetailedView from '../views/DetailedView.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		component: SignIn
	},
	{
		path: '/requestpwchange',
		component: RequestPWChange
	},
	{
		path: '/pwchange',
		component: PWChange
	},
	{
		path: '/home',
		component: Home,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/catalog',
		component: Catalog,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/adddata',
		component: AddData,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/changepwli',
		component: ChangePWLoggedIn,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/users',
		component: UserPanel,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/details',
		component: DetailedView,
		meta: {
			requiresAuth: true
		}
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

	if (requiresAuth && !auth.currentUser) {
		next('/');
	} else {
		next();
	}
});

export default router;