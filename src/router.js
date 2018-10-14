import Vue from 'vue'
import Router from 'vue-router'
import About from './views/About.vue'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Status from './components/status/Status.vue'
import Users from './components/user/Users.vue'
import NewTicket from './components/ticket/NewTicket.vue'
import EditTicket from './components/ticket/EditTicket.vue'
import Roles from './components/role/Roles.vue'
import auth from './middlewares/auth'
import loggedin from './middlewares/loggedin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/signin',
      beforeEnter: loggedin,
      component: Login
    },
    {
      path: '/tickets',
      beforeEnter: auth,
      component: Home
    },
    {
      path: '/tickets/:id',
      props: true,
      beforeEnter: auth,
      component: EditTicket,
      name:'editTicket'
    },
    {
      path:'/new-ticket',
      beforeEnter: auth,
      component:NewTicket
    },
    {
      path: '/status',
      beforeEnter: auth,
      component: Status
    },
    {
      path:'/users',
      beforeEnter: auth,
      component: Users
    },
    {
      path:'/roles',
      beforeEnter: auth,
      component: Roles,

    },
    {
      path:'/about',
      beforeEnter: auth,
      component: About
    }
    
  ]
})
