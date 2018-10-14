<template>
  <v-app >
    <v-navigation-drawer
      v-if="user"
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          router
          :to="item.action"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="user" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Logout
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    
    <v-content>
      <v-alert
        class="alert-message"
        transition="scale-transition"
        v-model="alert"
        :type="typeAlert"
      >
        {{messageAlert}}
        <v-icon 
          class="right-position"
          @click="closeAlertMessage"
        >
          close
        </v-icon>
                
      </v-alert>
      <router-view/>
    </v-content>
 
    <v-footer :fixed="fixed" app>
      <span>&copy; Tickets - VUE - Gilberto Méndez</span>
    </v-footer>
  </v-app>
</template>

<style scoped>
  .alert-message{
    margin: 10px;
  }
  .right-position{
    float:right;
  }
</style>
<script>

export default {
  name: 'App',
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'toc',
          title: 'Tickets',
          action:'/tickets'
        },
        {
          icon: 'turned_in',
          title: 'Statuses',
          action: '/status'
        },
        {
          icon: 'group',
          title: 'Users',
          action: '/users'
        },
        {
          icon: 'account_circle',
          title: 'Roles',
          action:'/roles'
        },
        {
          icon:'info',
          title: 'About',
          action:'/about'
        }
        
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Tickets'
    }
  },
  methods: {
    closeAlertMessage(){
      this.$store.dispatch('message/modifyAlert', false, {root: true})
      this.$store.dispatch('message/modfyTypeAlert', '', {root: true})
      this.$store.dispatch('message/modifyMessageAlert', '', {root: true})
    },
    onLogout(){
      this.$store.dispatch('user/logout')
    }
  },  
  computed:{
    alert() {
      return this.$store.getters['message/getAlert']
    },
    typeAlert(){
      return this.$store.getters['message/getTypeAlert']
    },
    messageAlert(){
      return this.$store.getters['message/getMessage']
    },
    user(){
      return this.$store.getters['user/getUserAuthenticated']
    } 
  }
}
</script>
