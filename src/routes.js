import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from "./components/Main";
import Vocabulary from "./components/Vocabulary";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import {store} from './store/store.js'

Vue.use(VueRouter);

const routes = [
    {
        path: '/sign-up',
        component: SignUp,
        meta: {requiresAuth: false}
    },
    {
        path: '/sign-in',
        component: SignIn,
        meta: {requiresAuth: false}
    },
    {
        path: '/',
        component: Main,
        meta: {requiresAuth: true}
    },
    {
        path: '/vocabulary',
        component: Vocabulary,
        beforeEnter: (to, from, next) => {
            store.dispatch('getAllWords').then(() => next());
        },
        meta: {requiresAuth: true},
    },
    {
        path: '/profile',
        component: Profile,
        meta: {requiresAuth: true}
    }
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // этот путь требует авторизации, проверяем залогинен ли
        // пользователь, и если нет, перенаправляем на страницу логина
        if (!store.getters.getTokens) {
            next({
                path: '/sign-in'
            })
        } else {
            next()
        }
    } else {
        next() // всегда так или иначе нужно вызвать next()!
    }
});

export {
    router
};