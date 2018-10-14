import axios from 'axios'
import GENERAL from '../config/general'
export default {
    namespaced: true,
    state:{
        users: []
    },
    mutations: {
        setLoadedUsers(state, payload){
            state.users = payload
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
        }
    },
    actions:{
        loadUsers({commit}){
            axios.get(`${GENERAL.API_URL}/users`)
            .then(response => {
                
                commit('setLoadedUsers', response.data.data)
            })
            .catch(err => {
                console.log("Error loading users", err)
            })
        },
        storeUser({dispatch,commit}, payload){
            axios.post(`${GENERAL.API_URL}/users`, payload)
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
        removeUser({dispatch,commit}, payload){
            axios.delete(`${GENERAL.API_URL}/users/${payload}`)
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
        }
    }
}