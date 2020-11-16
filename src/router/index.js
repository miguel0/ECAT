import Vue from 'vue';
import VueRouter from 'vue-router';
import { auth } from '../firebase';

import SignIn from '../views/SignIn';
import Home from '../views/Home';
import RequestPWChange from '../views/RequestPWChange.vue';
import AddDataFile from '../views/AddDataFile';
import ChangePWLoggedIn from '../views/ChangePWLoggedIn.vue';
import UserPanel from '../views/UserPanel';
import Vehicle from '../views/Vehicle';
import TruckSearch from '../views/TruckSearch.vue';
import Component from '../views/Component';
import EditPart from '../views/EditPart';
import EditComponent from '../views/EditComponent';
import AddDataManual from '../views/AddDataManual';
import PartSearch from '../views/PartSearch.vue';
import EditVehicle from '../views/EditVehicle';

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
		path: '/home',
		component: Home,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/adddatafile',
		component: AddDataFile,
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
		path: '/vehicles/:id',
		component: Vehicle,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/trucksearch',
		component: TruckSearch,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/components/:cid',
		component: Component,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/editpart/:pid',
		component: EditPart,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/editcomponent/:cid',
		component: EditComponent,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/editvehicle/:vid',
		component: EditVehicle,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/adddatamanual',
		component: AddDataManual,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/partsearch',
		component: PartSearch,
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