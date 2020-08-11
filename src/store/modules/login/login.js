import Vue from 'vue';
import Vuex from "vuex";
import axios from "axios";
import * as jwt_decode from 'jwt-decode';

Vue.use(Vuex, axios);

const state = {
    tokens: JSON.parse(localStorage.getItem('tokens')) || '',
    id: '',
    user: JSON.parse(localStorage.getItem('user')) || ''
};

const getters = {
    getTokens: state => {
        return state.tokens;
    },
    getId: state => {
        return state.id;
    },
    getUser: state => {
        return state.user;
    }
};

const mutations = {
    setTokens(state, tokens) {
        state.tokens = tokens;
    },
    setId(state, id) {
        state.id = id;
    },
    setUser(state, user) {
        state.user = user;
    }
};

const actions = {
    login({commit}, {email, password}) {
        return axios.post('http://localhost:8080/api/auth/sign-in', {
            email,
            password
        })
            .then(data => {
                const tokens = data.data.tokens;
                commit('setTokens', tokens);
                localStorage.setItem('tokens', JSON.stringify(tokens));
                let decode = jwt_decode(tokens.accessToken);
                commit('setId', decode.userId);
                return data;
            })
            .catch(error => {
                throw new Error(error.response.data);
            });
    },
    signup({commit}, {name, email, password}) {
        return axios.post('http://localhost:8080/api/auth/sign-up', {
            name,
            email,
            password
        })
            .then(data => {
                console.log(data);
                const tokens = data.data.tokens;
                commit('setTokens', tokens);
                localStorage.setItem('tokens', JSON.stringify(tokens));
                let decode = jwt_decode(tokens.accessToken);
                commit('setId', decode.userId);
                return data;
            })
            .catch(error => {
                throw new Error(error.response.data);
            });
    },
    getAuthUser({commit, getters}, id) {
        return axios.get(`http://localhost:8080/api/users/${id}`, {
            headers: {
                'Authorization': getters.getTokens.accessToken
            }
        })
            .then(data => {
                console.log(data);
                commit('setUser', data.data);
                localStorage.setItem('user', JSON.stringify(data.data));
                console.log(state.user);
                return data;
            })
            .catch(error => {
                throw new Error(error);
            });
    },
    signOut({commit}) {
        window.localStorage.removeItem("tokens");
        window.localStorage.removeItem("user");
        commit('setTokens', null);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}