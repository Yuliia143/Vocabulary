import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from "./components/Main";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

Vue.use(VueRouter);

const routes = [
    {
        path: '/sign-up',
        component: SignUp
    },
    {
        path: '/sign-in',
        component: SignIn
    },
    {
        path: '/',
        component: Main
    }
];

export const router = new VueRouter({
    routes,
    mode: 'history'
});