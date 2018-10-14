<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-icon>
          bookmarks
        </v-icon>
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
        :items="tickets"
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
      <v-dialog
        v-model="dialog"
        width="500"
      >

        <v-btn
          fab
          dark
          bottom
          right
          fixed
          slot="activator"
          color="blue"
        >
          <v-icon>add</v-icon>
        </v-btn>
        <newticket 
          :statuses="statuses"
        @cancel="closeModal"></newticket>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<style scoped>

</style>
<script>
import ModalTicket from '../components/ticket/ModaTicket.vue'
export default {
  components: {
    newticket:ModalTicket
  },
  data(){
    return {
      dialog: false,
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
        
      }
  },
  created(){
    this.$store.dispatch('ticket/loadTickets')
    this.$store.dispatch('status/loadStatuses')
  },
  methods: {
    editTicket(ticket){
      console.log(ticket)
    },
    removeTicket(ticket){
      console.log(ticket)
    },
    closeModal(value){
      this.dialog = value
    }
  },
  computed: {
    tickets(){
      return this.$store.getters['ticket/loadedTickets']
    },
    statuses(){
      return this.$store.getters['status/statuses']
    }
  }
}
</script>
