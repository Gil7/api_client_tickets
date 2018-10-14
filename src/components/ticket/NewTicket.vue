<template>
    <v-container>
        <v-card>
            <v-card-title
                class="headline blue white--text"
                primary-title
            >
                <v-icon>
                    list
                </v-icon>
                Create new Ticket
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-icon>
                        face
                    </v-icon>
                    <v-text-field
                        v-model="ticket.customer"
                        label="Customer"
                        required
                        hint="Customer's name here..."
                    >
                    </v-text-field>
                    <v-icon>
                        group
                    </v-icon>
                    <v-text-field
                        v-model="ticket.company"
                        hint="Type de company's name here..."
                        label="Company"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="ticket.subject"
                        label="Subject"
                        required
                    ></v-text-field>
                    <v-icon>
                        assignment
                    </v-icon>
                    <v-textarea
                        v-model="ticket.description"
                        label="Description"
                        hint="Type the description here..."
                    >
                        
                    </v-textarea>
                    <v-select
                        :items="statuses"
                        label="Status"
                        item-text="status"
                        item-value="_id"  
                        v-model="ticket.status" 
                    >
                    </v-select>
                    <v-select
                        :items="users"
                        item-text="name"
                        item-value="_id"
                        label="User"
                        v-model="ticket.assigned"
                        hint="User assigned"
                    >

                    </v-select>
                </v-form>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="error"
                    router
                    to="/tickets"
                >
                    Cancel
                </v-btn>
                
                <v-btn
                color="success"
                @click="addTicket"
                >
                
                Add
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>
<script>
import Ticket from '../../models/Ticket.js'
export default {
    data(){
        return {
            ticket: new Ticket('','','','','','','')
        }
    },
    created(){
        this.$store.dispatch('status/loadStatuses')
        this.$store.dispatch('user/loadUsers')
    },
    methods: {
        addTicket(){
            this.$store.dispatch('ticket/createTicket', this.ticket)
            this.$router.push('/tickets')
        }
    },
    computed: {
        statuses(){
            return this.$store.getters['status/getStatuses']
        },
        users(){
            return this.$store.getters['user/getUsers']
        }
    }
}
</script>
