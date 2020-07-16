import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import login from './modules/login/login';
import vocabulary from './modules/vocabulary/vocabulary';

export const store = new Vuex.Store({
    modules: {
        login,
        vocabulary
    }
});
