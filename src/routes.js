import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter);

import Login from "./components/Login";
import Main from "./components/Main";

const routes = [
    {
        path: '',
        component: Login
    },
    {
        path: '/main',
        component: Main
    }
];

export const router = new VueRouter({
    routes,
    mode: 'history'
});