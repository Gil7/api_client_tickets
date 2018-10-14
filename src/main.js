import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { store } from './store/main'

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))
    if(user && token){
      localStorage.clear()
      this.$store.dispatch('user/autoSignin', { user, token })
    }
  },
  watch:{
    user(){
      if(!this.user){
        this.$router.push('/signin')
      }
      else {
        this.$router.push('/tickets')
      }
    }
  },
  computed:{
    user(){
      return this.$store.getters['user/getUserAuthenticated']
    },
    token(){
      return this.$store.getters['user/getToken']
    }
  }
}).$mount('#app')
