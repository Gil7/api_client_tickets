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
        updateRole(state, payload, index){
            state.roles[index] = payload
        },
        removeRole(state, payload){
            state.roles.filter((role) => role._id != payload)
            console.log("Role removed ",state.roles)
        }
    },
    actions: { 
        loadRoles({commit}){
            axios.get(`${GENERAL.API_URL}/roles`)
            .then(response => {
                commit('setLoadedRoles', response.data.data)
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
        },
        storeRole({dispatch, commit, getters, rootGetters}, payload){
            axios.post(`${GENERAL.API_URL}/roles`, payload)
            .then(response => {
                console.log(response)
                commit('addRole', response.data.data)
                dispatch('message/modifyAlert', true, {root: true})
                dispatch('message/modfyTypeAlert', 'success', {root: true})
                dispatch('message/modifyMessageAlert', 'New role created', {root: true})

            })
            .catch(err => {
                console.log(err)
            })
        },
        updateRole({commit}, payload, index){
            axios.put(`${GENERAL.API_URL}/roles/${payload.id}`, payload)
            .then(response => {
                commit('updateRole', response.data.data, index)
            })
            .catch(err => {
                console.log(err)
            })
        },
        removeRole({commit}, payload){
            axios.delete(`${GENERAL.API_URL}/roles/${payload}`)
            .then(response => {
                commit('removeRole', payload)
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    getters: {
        getRoles(state){
            return state.roles
        }
    }

}