import Vue from 'vue';
import VueRouter from 'vue-router';

import SignIn from '../views/SignIn';
import RequestPWChange from '../views/RequestPWChange.vue'
import PWChange from '../views/PWChange.vue'
import Home from '../views/Home'

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
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router;