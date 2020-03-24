import Vue from 'vue';
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex, axios);

const state = {
    email: '',
    password: '',
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || ''
};

const getters = {
    getEmail: state => {
        return state.email;
    },
    getPassword: state => {
        return state.password;
    },
    getAccessToken: state => {
        return state.accessToken;
    },
    getRefreshToken: state => {
        return state.refreshToken;
    }
};

const mutations = {
    setEmail(state, payload) {
        state.email = payload;
    },
    setPassword(state, payload) {
        state.password = payload;
    },
    setAccessToken(state, payload){
        state.accessToken = payload;
    },
    setRefreshToken(state, payload){
        state.refreshToken = payload;
    }
};

const actions = {
    login({commit}, {email, password}) {
        return axios.post('http://localhost:8080/api/auth/sign-in', {
            email,
            password
        })
            .then(data => {
                console.log(data);
                const accessToken = data.data.tokens.accessToken;
                const refreshToken = data.data.tokens.refreshToken;
                commit('setAccessToken', accessToken);
                commit('setRefreshToken', refreshToken);
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
            })
            .catch(error => {
                console.log(error);
            });
    },
    signup({commit}, {email, password}) {
        return axios.post('http://localhost:8080/api/auth/sign-up', {
            email,
            password
        })
            .then(data => {
                console.log(data);
                const accessToken = data.data.tokens.accessToken;
                const refreshToken = data.data.tokens.refreshToken;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
            })
            .catch(error => {
                console.log(error);
            });
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}