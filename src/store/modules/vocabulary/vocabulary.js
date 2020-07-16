import Vue from 'vue';
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex, axios);

const state = {
    words: [
        {
            id: '1',
            title: 'age',
        },
        {
            id: '2',
            title: 'sprint',
        },
        {
            id: '3',
            title: 'after all',
        },
        {
            id: '4',
            title: 'it dawned on me',
        },
    ],
    query: '',
};

const getters = {
    getWords: state => {
        return state.words;
    },
    getQuery: state => {
        return state.query;
    },
};

const mutations = {
    updateQuery(state, payload) {
        state.query = payload
    },
    removeWord(state, payload) {
        let index = state.words.findIndex(word => word.id === payload);
        state.words.splice(index, 1);
    }
};

const actions = {
};

export default {
    state,
    getters,
    actions,
    mutations
}