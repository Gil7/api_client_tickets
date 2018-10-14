<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-icon>
            assignment_ind
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
            <td class="text-xs-left">{{ props.item.name }}</td>
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
        v-model="editingRole"
        width="500"
        >
          <edit-role
            :role="roleEditing"
            @cancelEditing="cancelEditing"
            >
            </edit-role>
      </v-dialog>
      
      <v-dialog
        v-model="remove"    
        width="300px"
        >
          <v-card
            >
              <v-card-title
                class="headline blue white--text"
              >
                  Remove role
              </v-card-title>
            <v-card-text>
                <p v-if="roleToDelete">
                    Do you really want to delete this role:
                    {{roleToDelete.name}}
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
                    @click="onRemoveRole"
                    >
                    <v-icon>
                        check
                    </v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
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
import ModalNewRole from './ModalNewRole';
import EditRole from './EditRole';
import Role from '../../models/Role.js'
export default {
    components:{
        'new-role': ModalNewRole,
        'edit-role' : EditRole
    },
    data(){
        return {
            
            headers: [
                {
                    text: 'Name',
                    value: 'name'
                },
                {
                    text:'Actions',
                    name:'actions',
                    sortable:false,
                    
                }
            ],
            search:'',
            dialog: false,
            remove: false,
            roleToDelete: null,
            roleEditing: new Role('',''),
            editingRole: false
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
            this.roleEditing= role
            this.editingRole = true
        },
        cancelEditing(){
            this.roleEditing = new Role('','')
            this.editingRole = false
        },
        removeRole(role){
            this.roleToDelete = role
            this.remove = true
        },
        cancelRemove(){
            this.remove = false
            this.roleToDelete
        },
        onRemoveRole(){
            this.$store.dispatch('roles/removeRole', this.roleToDelete._id)
            this.remove = false
            this.roleToDelete = null
        }
    },
    computed:{
        roles(){
            return this.$store.getters['roles/getRoles']
        }
    }
    
    
}
</script>
