import Vue from 'vue'
import Vuex from 'vuex'
import status from './status'
import ticket from './ticket'
import roles from './role'
import message from './message'
import user from './user'

Vue.use(Vuex)
export const store = new Vuex.Store({
    modules: {
        status,
        ticket,
        roles,
        user,
        message
    }
})