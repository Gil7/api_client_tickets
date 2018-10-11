<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Tickets
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.customer }}</td>
          <td class="text-xs-right">{{ props.item.company }}</td>
          <td class="text-xs-right">{{ props.item.subject }}</td>
          <td class="text-xs-right">{{ props.item.description }}</td>
          <td class="text-xs-right">{{ props.item.status.status }}</td>
          <td class="text-xs-right">{{ props.item.assigned.name }}</td>
          <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2 blue--text"
            @click="editTicket(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            class="red--text"
            @click="removeTicket(props.item)"
          >
            delete
          </v-icon>
        </td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
    </v-card>

  </v-container>
</template>

<style scoped>

</style>
<script>
export default {
  data(){
    return {
      search: '',
      loading: true,
      headers: [
          {
            text: 'Customer',
            align: 'left',
            value: 'customer',
          },
          { text: 'Company', value: 'company' },
          { text: 'Subject', value: 'subject' },
          { text: 'Description', value: 'description' },
          { text: 'Status', value: 'status' },
          { text: 'Assigned to', value: 'assigned' },
          {text: 'Actions', value: 'name', sortable: false}
        ],
        desserts: []
      }
  },
  created(){
    this.$store.dispatch('loadTickets')
    this.desserts = this.tickets
    
  },
  methods: {
    editTicket(ticket){
      console.log(ticket)
    },
    removeTicket(ticket){
      console.log(ticket)
    }
  },
  computed: {
    tickets(){
      return this.$store.getters.loadedTickets
    }
  }
}
</script>
