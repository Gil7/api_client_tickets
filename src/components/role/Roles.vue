<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-icon>
            user
        </v-icon>
        Roles
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
        :items="roles"
        :search="search"
      >
        <template slot="items" slot-scope="props">
            <td class="text-xs-right">{{ props.item.name }}</td>
            <td class="justify-center layout px-0">
                <v-icon
                    small
                    class="mr-2 blue--text"
                    @click="editRole(props.item)"
                >
                    edit
                </v-icon>
                <v-icon
                    small
                    class="red--text"
                    @click="removeRole(props.item)"
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
        <new-role 
            @cancel="closeModal">
        </new-role>
      </v-dialog>
    </v-card>
  </v-container>
</template>
<script>
import ModalNewRole from './ModalNewRole'
import Role from '../../models/Role.js'
export default {
    components:{
        'new-role': ModalNewRole,
    },
    data(){
        return {
            newRole : new Role('',''),
            headers: [
                {
                    text: 'Name',
                    value: 'name'
                }
            ],
            search:'',
            dialog: false
        }
    },
    created(){
        this.$store.dispatch('roles/loadRoles')
        
    },
    methods: {
        closeModal(closeModal){
            this.dialog = false
        },
        editRole(role){
            
        },
        removeRole(role){
            this.$store.dispatch('roles/removeRole', role._id)
            this.dialog = false
        }
    },
    computed:{
        roles(){
            return this.$store.getters['roles/getRoles']
        }
    }
    
    
}
</script>
