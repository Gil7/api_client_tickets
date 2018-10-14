import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import status from './store/status'
import ticket from './store/ticket'
import roles from './store/role'
import message from './store/message'
import user from './store/user'
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


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
