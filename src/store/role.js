import axios from 'axios';
import GENERAL from '../config/general'
export default {
    namespaced: true,
    state: {
        roles: []
    },
    mutations: {
        setLoadedRoles(state, payload){
            state.roles = payload
        },
        addRole(state, payload){
            state.roles.push(payload)
        },
        updateRole(state, payload){
            
            
        },
        removeRole(state, payload){
            state.roles = state.roles.filter((role) => role._id != payload)
            console.log("Role removed ",state.roles)
        }
    },
    actions: { 
        loadRoles({commit}){
            axios.get(`${GENERAL.API_URL}/roles`)
            .then(response => {
                commit('setLoadedRoles', response.data.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        storeRole({dispatch, commit, getters, rootGetters}, payload){
            axios.post(`${GENERAL.API_URL}/roles`, payload)
            .then(response => {
                commit('addRole', response.data.data)
                dispatch('message/modifyAlert', true, {root: true})
                dispatch('message/modfyTypeAlert', 'success', {root: true})
                dispatch('message/modifyMessageAlert', 'New role created', {root: true})

            })
            .catch(err => {
                console.log(err)
            })
        },
        updateRole({dispatch,commit, getters}, payload){
            axios.put(`${GENERAL.API_URL}/roles/${payload._id}`, payload)
            .then(response => {
                commit('updateRole', payload)
                dispatch('message/modifyAlert', true, { root: true })
                dispatch('message/modfyTypeAlert', 'success', { root: true })
                dispatch('message/modifyMessageAlert', response.data.message, { root: true })
            })
            .catch(err => {
                console.log(err)
            })
        },
        removeRole({dispatch,commit, getters, rootGetters}, payload){
            axios.delete(`${GENERAL.API_URL}/roles/${payload}`)
            .then(response => {
                commit('removeRole', payload)
                dispatch('message/modifyAlert', true, { root: true })
                dispatch('message/modfyTypeAlert', 'success', { root: true })
                dispatch('message/modifyMessageAlert', response.data.message, { root: true })
            })
            .catch(err => {
                dispatch('message/modifyAlert', true, { root: true })
                dispatch('message/modfyTypeAlert', 'error', { root: true })
                dispatch('message/modifyMessageAlert', 'Error removing the role', { root: true })
            })
        }
    },
    getters: {
        getRoles(state){
            return state.roles
        }
    }

}