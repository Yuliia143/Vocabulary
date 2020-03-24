import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import login from "./modules/login/login";

export const store = new Vuex.Store({
    modules: {
        login
    }
});
