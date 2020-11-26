import Vue from 'vue';
import VueRouter from 'vue-router';
import api from '../services/api/api';
import { auth } from '../firebase';

import SignIn from '../views/SignIn';
import Home from '../views/Home';
import RequestPWChange from '../views/RequestPWChange.vue';
import AddDataFile from '../views/AddDataFile';
import AddImages from "../views/AddImages";
import ChangePWLoggedIn from '../views/ChangePWLoggedIn.vue';
import UserPanel from '../views/UserPanel';
import AddUser from "../views/AddUser";
import EditUser from "../views/EditUser";
import Vehicle from '../views/Vehicle';
import TruckSearch from '../views/TruckSearch.vue';
import Component from '../views/Component';
import EditPart from '../views/EditPart';
import EditPartFromComponent from "../views/EditPartFromComponent";
import EditComponent from '../views/EditComponent';
import AddDataManual from '../views/AddDataManual';
import PartSearch from '../views/PartSearch.vue';
import EditVehicle from '../views/EditVehicle';
import EditGroup from '../views/EditGroup';

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
			requiresAuth: true,
			requiresAdmin: true
		}
	},
	{
		path: '/adddatamanual',
		component: AddDataManual,
		meta: {
			requiresAuth: true,
			requiresAdmin: true
		}
	},
	{
		path: '/addimages',
		component: AddImages,
		meta: {
			requiresAuth: true,
			requiresAdmin: true
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
			requiresAuth: true,
			requiresAdmin: true
		}
	},
	{
		path: '/edituser/:id',
		component: EditUser,
		meta: {
			requiresAuth: true,
			requiresAdmin: true
		}
	},
	{
		path: '/adduser/',
		component: AddUser,
		meta: {
			requiresAuth: true,
			requiresAdmin: true
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
			requiresAuth: true,
			requiresAdmin: true
		}
	},
	{
		path: '/editpartfromcomponent/:cpid/:pid',
		component: EditPartFromComponent,
		meta: {
			requiresAuth: true,
			requiresAdmin: true
		}
	},
	{
		path: '/editcomponent/:cid',
		component: EditComponent,
		meta: {
			requiresAuth: true,
			requiresAdmin: true
		}
	},
	{
		path: '/editvehicle/:vid',
		component: EditVehicle,
		meta: {
			requiresAuth: true,
			requiresAdmin: true
		}
	},
	{
		path: '/partsearch',
		component: PartSearch,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/editgroup/:gid',
		component: EditGroup,
		meta: {
			requiresAuth: true,
			requiresAdmin: true
		}
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach(async (to, from, next) => {
	
	const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
	const requiresAdmin = to.matched.some(x => x.meta.requiresAdmin);

	if(requiresAuth) {

		if(auth.currentUser) {

			if(requiresAdmin) {
				let isAdmin = false;
				try {
					let user = await api.usersApi.getUser(auth.currentUser.uid);
				
					if(user.role) {
						isAdmin = user.role === 'A' ? true : false;
					}

				} catch(err) {
					alert(err.message);
					return next(false);
				}

				//console.log("admin required, admin? ", isAdmin);
				return next(isAdmin);

			}

			//console.log("only auth required, user exists");
			return next();

		}
		//console.log("auth required, no user");
		return next(false);
	}
	//console.log("no auth required");
	return next();
	
});

export default router;