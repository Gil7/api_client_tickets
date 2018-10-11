import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
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
      axios.get(`${getters.url}/api/tickets`)
      .then(response => {
        console.log(response)
        commit('setLoadedTickets', response.data.data)
      })
      .catch(err => {

      })
    },
    createTicket({commit, getters}, payload){
      axios.post(`${gettets.url}/api/tickets`, payload)
      .then(response => {
        console.log(response)
      })
      .catch(err => {

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
    url(state){
      return state.url
    }
  }
})
