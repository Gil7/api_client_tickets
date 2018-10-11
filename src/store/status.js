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
            axios.get('/api/statuses')
            .then(response => {
                commit('setLoadedStatues', response.data.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    getters:{

    }
}
