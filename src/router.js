import Vue from 'vue'
import Router from 'vue-router'
import About from './views/About.vue'
import Home from './views/Home.vue'
import Status from './components/status/Status.vue'
import Users from './components/user/Users.vue'
import Roles from './components/role/Roles.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/status',
      component: Status
    },
    {
      path:'/users',
      component: Users
    },
    {
      path:'/roles',
      component: Roles,

    },
    {
      path:'/about',
      component: About
    }
    
  ]
})
