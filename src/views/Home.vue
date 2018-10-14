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
      <v-btn
          fab
          dark
          bottom
          right
          fixed
          router
          to="/new-ticket"
          color="blue"
        >
          <v-icon>add</v-icon>
        </v-btn>
    </v-card>
    <v-dialog
        v-model="remove"    
        width="300px"
        >
          <v-card
            >
              <v-card-title
                class="headline blue white--text"
              >
                  Remove ticket
              </v-card-title>
            <v-card-text>
                <p v-if="ticketToDelete">
                    Do you really want to delete this ticket:
                    {{ticketToDelete._id}}
                </p>
                
            </v-card-text>
            <v-card-actions>
                <v-btn
                    @click="cancelRemove"
                    class="error">
                    <v-icon
                        >
                        close
                    </v-icon>
                </v-btn>
                <v-btn
                    class="success"
                    @click="onRemoveTicket"
                    >
                    <v-icon>
                        check
                    </v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
  </v-container>
</template>

<style scoped>

</style>
<script>
import Ticket from '../models/Ticket.js'
export default {
  components: {
    
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
        remove: false,
        ticketToDelete: new Ticket('','','','','','','')
        
      }
  },
  created(){
    this.$store.dispatch('ticket/loadTickets')
    this.$store.dispatch('status/loadStatuses')
  },
  methods: {
    editTicket(ticket){
      console.log("TICKER ID ",ticket)
      this.$router.push({ name: 'editTicket', params: { id : ticket._id }})
    },
    removeTicket(ticket){
      this.ticketToDelete = ticket
      this.remove = true
    },
    onRemoveTicket(){
      this.$store.dispatch('ticket/removeTicket', this.ticketToDelete)
      this.remove = false
      this.ticketToDelete = new Ticket('','','','','','','') 
    },
    closeModal(value){
      this.remove = value
    },
    cancelRemove(){
      this.ticketToDelete = new Ticket('','','','','','','')
      this.remove = false
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
