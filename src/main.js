import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import status from './store/status'
import ticket from './store/ticket'

Vue.use(Vuex)
export const store = new Vuex.Store({
  modules: {
    status,
    ticket
  }
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
