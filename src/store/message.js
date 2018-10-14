export default {
    namespaced:true,
    state:{
        type:'',
        alert: false,
        message: ''
    },
    mutations:{
        setAlert(state, payload){
            state.alert = payload
        },
        setType(state, payload){
            state.type =  payload
        },
        setMessage(state, payload){
            state.message = payload
        }
    },
    actions:{
        modifyAlert({commit}, payload){
            commit('setAlert', payload)
        },
        modfyTypeAlert({commit}, payload){
            commit('setType', payload)
        },
        modifyMessageAlert({commit}, payload){
            commit('setMessage', payload)
        }
    },
    getters: {
        getAlert(state){
            return state.alert
        },
        getTypeAlert(state){
            return state.type
        },
        getMessage(state){
            return state.message
        }
    }
}