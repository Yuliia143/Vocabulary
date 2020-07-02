import Vue from 'vue';
import Vuex from "vuex";
import axios from "axios";
import * as jwt_decode from 'jwt-decode';

Vue.use(Vuex, axios);

const state = {
    tokens: JSON.parse(localStorage.getItem('tokens')) || '',
    id: ''
};

const getters = {
    getTokens: state => {
        return state.tokens;
    },
    getId: state => {
        return state.id;
    }
};

const mutations = {
    setTokens(state, tokens){
        state.tokens = tokens;
    },
    setId(state, id){
        state.id = id;
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
    getAuthUser({commit, getters}, id){
        return axios.get(`http://localhost:8080/api/users/${id}` , {
            headers: {
                'Authorization': getters.getTokens.accessToken
            }
        })
            .then(data=>{
                return data;
            })
            .catch(error => {
                throw new Error(error);
            });
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}