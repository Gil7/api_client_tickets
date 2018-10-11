import axios from 'axios'
export default {
    namespaced: true,
    state: {
        statuses: [],
        url: 'http://localhost:3000'
    },
    mutations: {
        setLoadedStatuses(state, payload){
            state.statues = payload
        },
        createStatus(state, payload){
            state.statuses.push(payload)
        }
    },
    actions: {
        loadStatuses({commit, getters}){
            axios.get(`${getters.url}/api/statuses`)
            .then(response => {
                commit('setLoadedStatuses', response.data.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    getters:{
        statuses(state){
            return state.statuses
        },
        url(state){
            return state.url
        }
    }
}
