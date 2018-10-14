import axios from 'axios'
import GENERAL from '../config/general'
export default {
    namespaced: true,
    state:{
        users: [],
        user_authenticated: null,
        jwt_token: null
    },
    mutations: {
        setLoadedUsers(state, payload){
            state.users = payload
        },
        setUser(state, payload){
            state.user_authenticated = payload
            localStorage.setItem('user', JSON.stringify(payload))
        },
        setToken(state, payload){
            state.jwt_token = payload
            localStorage.setItem('token', payload)
        },
        addUser(state, payload){
            state.users.push(payload)
        },
        removeUser(state, payload){
            
        },
        updateUser(state, payload){
            state.user = state.user.map(user => {
                if(user._id == payload._id){
                    user = payload
                }
            })
        },
        removeUserAuthenticated(state){
            state.user_authenticated = null
            state.jwt_token = null
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        }
    },
    actions:{
        loginUser({commit}, payload, rootGetters){
            axios.post(`${GENERAL.API_URL}/users/login`,payload)
            .then(response => {
                commit('setUser', response.data.user)
                commit('setToken', response.data.token)
                
            })
            .catch(err => {
                console.log(err)
            })
        },
        autoSignin({commit}, payload){
            localStorage.clear()
            commit('setUser', payload.user)
            commit('setToken', payload.token)
        },
        logout({commit}){
            commit('removeUserAuthenticated')
        },
        loadUsers({commit, getters, rootGetters}){
            axios.get(`${GENERAL.API_URL}/users`, {
                headers: {
                    'authorization': rootGetters['user/getToken']
                 }
            })
            .then(response => {
                ''
                commit('setLoadedUsers', response.data.data)
            })
            .catch(err => {
                console.log("Error loading users", err)
            })
        },
        storeUser({dispatch,commit, rootGetters}, payload, ){
            axios.post(`${GENERAL.API_URL}/users`, payload, {
                headers: {
                    'authorization': rootGetters['user/getToken']
                }
            })
            .then(response => {
                commit('addUser', response.data.data)
                dispatch('message/modifyAlert', true, { root: true })
                dispatch('message/modfyTypeAlert', 'success', { root: true })
                dispatch('message/modifyMessageAlert', response.data.message, { root: true })
            })
            .catch(err => {
                dispatch('message/modifyAlert', true, { root: true })
                dispatch('message/modfyTypeAlert', 'error', { root: true })
                dispatch('message/modifyMessageAlert', 'Error creating the new user', { root: true })
            })
        },
        removeUser({dispatch,commit, rootGetters}, payload){
            axios.delete(`${GENERAL.API_URL}/users/${payload}`, {
                headers: {
                    'authorization': rootGetters['user/getToken']
                }
            })
            .then(response => {
                commit('updatedUser', response.data.data)
                dispatch('message/modifyAlert', true, { root: true })
                dispatch('message/modfyTypeAlert', 'success', { root: true })
                dispatch('message/modifyMessageAlert', response.data.message, { root: true })
            })
            .catch(err => {
                dispatch('message/modifyAlert', true, { root: true })
                dispatch('message/modfyTypeAlert', 'error', { root: true })
                dispatch('message/modifyMessageAlert', 'Error creating the new user', { root: true })
            })
        }
    },
    getters:{
        getUsers(state){
            return state.users
        },
        getUserAuthenticated(state){
            return state.user_authenticated
        },
        getToken(state){{
            return state.jwt_token
        }}
    }
}