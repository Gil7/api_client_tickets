import GENERAL from '../config/general'
import axios from 'axios'
export default {
    namespaced: true,
    state: {
        statuses: [],
    },
    mutations: {
        setLoadedStatuses(state, payload){
            state.statuses = payload
        },
        createStatus(state, payload){
            state.statuses.push(payload)
        },
        removeStatus(state, payload){
            state.statuses = state.statuses.filter(status => status._id != payload)
        }
    },
    actions: {
        loadStatuses({commit, getters, rootGetters}){
            axios.get(`${GENERAL.API_URL}/statuses`, {
                headers: {
                    'authorization': rootGetters['user/getToken']
                }
            })
            .then(response => {
                commit('setLoadedStatuses', response.data.data)
                
            })
            .catch(err => {
                dispatch('message/modifyAlert', true, { root: true })
                dispatch('message/modfyTypeAlert', 'error', { root: true })
                dispatch('message/modifyMessageAlert', 'Error loading statuses', { root: true })
            })
        },
        storeStatus({dispatch, commit, getters, rootGetters}, payload){
            axios.post(`${GENERAL.API_URL}/statuses`, payload, {
                headers: {
                    'authorization': rootGetters['user/getToken']
                }
            })
            .then(response => {
                commit('createStatus', response.data.data)
                dispatch('message/modifyAlert', true, { root: true })
                dispatch('message/modfyTypeAlert', 'success', { root: true })
                dispatch('message/modifyMessageAlert', response.data.message, { root: true })
            })
            .catch(err => {
                dispatch('message/modifyAlert', true, { root: true })
                dispatch('message/modfyTypeAlert', 'error', { root: true })
                dispatch('message/modifyMessageAlert', 'Error creating the status', { root: true })
            })
        },
        updateStatus({commit}, payload){

        },
        removeStatus({dispatch,commit, rootGetters}, payload){
            axios.delete(`${GENERAL.API_URL}/statuses/${payload}`, {
                headers: {
                    'authorization': rootGetters['user/getToken']
                }
            })
            .then(response => {
                commit('removeStatus', payload)
                dispatch('message/modifyAlert', true, { root: true })
                dispatch('message/modfyTypeAlert', 'success', { root: true })
                dispatch('message/modifyMessageAlert', response.data.message, { root: true })
            })
            .catch(err => {
                dispatch('message/modifyAlert', true, { root: true })
                dispatch('message/modfyTypeAlert', 'error', { root: true })
                dispatch('message/modifyMessageAlert', 'Error removing the status', { root: true })
            })
        }
    },
    getters:{
        getStatuses(state){
            return state.statuses
        }
    }
}
