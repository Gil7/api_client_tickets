import axios from 'axios'
import GENERAL from '../config/general'
export default {
  namespaced: true,
  state: {
    tickets:[],
    user: null,
    token: null,
    loading: false,
    error: null,
    url: 'http://localhost:3000'
  },
  mutations: {
    setLoadedTickets(state, payload){
      state.tickets = payload
    },
    createTicket(state, payload){
      state.tickets.push(payload)
    },
    setUser(state, payload){
      state.user = payload
    },
    setToken(state, payload){
      state.token = payload
    },
    setLoading(state, payload){
      state.loading = payload
    },
    setError(state, payload){
      state.error = payload
    },
    clearError(state, payload){
      state.error = null
    }
  },
  actions: {
    loadTickets({commit, getters}){
      axios.get(`${GENERAL.API_URL}/tickets`)
      .then(response => {
        commit('setLoadedTickets', response.data.data)
      })
      .catch(err => {
        console.log(err)
      })  
    },
    createTicket({dispatch, commit}, payload){
      axios.post(`${GENERAL.API_URL}/tickets`, payload)
      .then(response => {
        commit('createTicket', response.data.data)
        dispatch('message/modifyAlert', true, { root: true })
        dispatch('message/modfyTypeAlert', 'success', { root: true })
        dispatch('message/modifyMessageAlert', response.data.message, { root: true })
      })
      .catch(err => {
        dispatch('message/modifyAlert', true, { root: true })
        dispatch('message/modfyTypeAlert', 'success', { root: true })
        dispatch('message/modifyMessageAlert', 'Error creating the ticket', { root: true })
      })
    }
  },
  getters: {
    loadedTickets(state){
      return state.tickets
    },
    user(state){
      return state.user
    },
    token(state){
      return state.token
    },
    loading(state){
      return state.loading
    },
  }
}
