import Vue from 'vue';
import VueRouter from 'vue-router';

import SignIn from '../views/SignIn';
import Home from '../views/Home';
import Catalog from '../views/Catalog';
import RequestPWChange from '../views/RequestPWChange.vue';
import PWChange from '../views/PWChange.vue';
import AddData from '../views/AddData.vue';
import ChangePWLoggedIn from '../views/ChangePWLoggedIn.vue';
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
        component: Home
    },
    {
        path: '/catalog',
        component: Catalog
	},
	{
		path: '/adddata',
		component: AddData
	},
	{
		path: '/changepwli',
		component: ChangePWLoggedIn
	},
	{
		path: '/details',
		component: DetailedView
	}
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router;