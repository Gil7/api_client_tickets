import axios from 'axios'
import GENERAL from '../config/general'
export default {
  namespaced: true,
  state: {
    tickets:[],
  },
  mutations: {
    setLoadedTickets(state, payload){
      state.tickets = payload
    },
    createTicket(state, payload){
      state.tickets.push(payload)
    },
    updateTicket(state, payload){
      state.tickets = state.tickets.map((ticket, index) => {
        if(ticket._id == payload._id){
          state.tickets[index] = payload
        }
      })
    },
    removeTicket(state, payload){
      state.tickets = state.tickets.filter( ticket => ticket._id != payload._id )
    }
    
  },
  actions: {
    loadTickets({commit, getters, rootGetters}){
      axios.get(`${GENERAL.API_URL}/tickets`, {
        headers: {
          'authorization': rootGetters['user/getToken']
        }
      })
      .then(response => {
        commit('setLoadedTickets', response.data.data)
      })
      .catch(err => {
        console.log(err)
      })  
    },
    createTicket({dispatch, commit, rootGetters}, payload){
      axios.post(`${GENERAL.API_URL}/tickets`, payload, {
        headers: {
          'authorization': rootGetters['user/getToken']
        }
      })
      .then(response => {
        commit('createTicket', response.data.data)
        dispatch('message/modifyAlert', true, { root: true })
        dispatch('message/modfyTypeAlert', 'success', { root: true })
        dispatch('message/modifyMessageAlert', response.data.message, { root: true })
      })
      .catch(err => {
        dispatch('message/modifyAlert', true, { root: true })
        dispatch('message/modfyTypeAlert', 'error', { root: true })
        dispatch('message/modifyMessageAlert', 'Error creating the ticket', { root: true })
      })
    },
    updateTicket({ dispatch,commit, getters, rootGetters }, payload) {
      axios.put(`${GENERAL.API_URL}/tickets/${payload._id}`, payload, {
        headers: {
          'authorization': rootGetters['user/getToken']
        }
      })
      .then(response => {
        commit('updateTicket', payload)
        dispatch('message/modifyAlert', true, { root: true })
        dispatch('message/modfyTypeAlert', 'success', { root: true })
        dispatch('message/modifyMessageAlert', response.data.message, { root: true })
      })
      .catch(err => {
        dispatch('message/modifyAlert', true, { root: true })
        dispatch('message/modfyTypeAlert', 'error', { root: true })
        dispatch('message/modifyMessageAlert', 'Error updating the ticket', { root: true })
      })
    },
    removeTicket({dispatch, commit, getters, rootGetters}, payload){
      axios.delete(`${GENERAL.API_URL}/tickets/${payload._id}`,{
        headers: {
          'authorization': rootGetters['user/getToken']
        }
      })
      .then(response => {
        commit('removeTicket', payload)
        dispatch('message/modifyAlert', true, { root: true })
        dispatch('message/modfyTypeAlert', 'success', { root: true })
        dispatch('message/modifyMessageAlert', response.data.message, { root: true })
      })
      .catch(err => {
        dispatch('message/modifyAlert', true, { root: true })
        dispatch('message/modfyTypeAlert', 'error', { root: true })
        dispatch('message/modifyMessageAlert', 'Error removing the ticket', { root: true })
      })
    }
  },
  getters: {
    loadedTickets(state){
      return state.tickets
    },
    getTicket(state, ticket){
      return state.tickets.find( item => item._id == ticket._id)
    }
  }
}
