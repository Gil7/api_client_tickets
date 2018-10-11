<template>
  <v-app >
    <v-navigation-drawer
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
      </v-list>
    </v-navigation-drawer>
    
    <v-content>
      <router-view/>
    </v-content>
 
    <v-footer :fixed="fixed" app>
      <span>&copy; Tickets - VUE</span>
    </v-footer>
  </v-app>
</template>

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
          action:'/'
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
        
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Tickets'
    }
  }
}
</script>
