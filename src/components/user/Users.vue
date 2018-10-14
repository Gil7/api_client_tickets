<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-icon>
            account_circle
        </v-icon>
        Users
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
        :items="users"
        :search="search"
      >
        <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.lastname }}</td>
            <td class="text-xs-left">{{ props.item.email }}</td>
            <td class="text-xs-left">
                <v-chip v-if="props.item.active" class="success">
                    Yes
                </v-chip>
                <v-chip v-else class="error">
                    No
                </v-chip>
            </td>
            <td class="text-xs-left">
                <v-chip class="white--text error" v-if="props.item.role.name == 'Administrator'">
                    <v-icon>
                        account_circle
                    </v-icon>
                    {{ props.item.role.name }}
                </v-chip >
                <v-chip class="warning white--text" v-else>
                    <v-icon>
                        account_circle
                    </v-icon>
                    
                    {{ props.item.role.name }}
                </v-chip>
            </td>
            <td class="justify-center layout px-0">
                <v-icon
                    small
                    class="mr-2 blue--text"
                    @click="editUser(props.item)"
                >
                    edit
                </v-icon>
                <v-icon
                    small
                    class="red--text"
                    @click="removeUser(props.item)"
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
        v-model="editingUser"
        width="500"
        >
          <edit-user
            :user="userEditing"
            @cancelEditing="cancelEditing"
            >
            </edit-user>
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
                  Remove user
              </v-card-title>
            <v-card-text>
                <p v-if="userToDelete">
                    Do you really want to delete this user:
                    {{userToDelete.name}}
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
                    @click="onRemoveUser"
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
        <new-user
            
            @cancel="closeModal">
        </new-user>
      </v-dialog>
    </v-card>
  </v-container>
</template>
<script>
import ModalNewUser from './ModalNewUser';
import EditUser from './EditUser';
import User from '../../models/User.js'
export default {
    components:{
        'new-user': ModalNewUser,
        'edit-user' : EditUser
    },
    data(){
        return {
            headers: [
                {
                    text: 'Name',
                    value: 'name'
                },
                {
                    text:'Lastname',
                    value:'lastname'
                },
                {
                    text:'Email',
                    value:'email'
                },
                {
                    text:'Role',
                    value:'role.role'
                },
                {
                    text:'Actions',
                    name:'actions',
                    sortable:false
                }
            ],
            search:'',
            dialog: false,
            remove: false,
            userToDelete: null,
            userEditing: new User('','','','',''),
            editingUser: false
        }
    },
    created(){
        this.$store.dispatch('user/loadUsers')
        this.$store.dispatch('roles/loadRoles')
    },
    methods: {
        closeModal(closeModal){
            this.dialog = false
        },
        editUser(user){
            this.userEditing= user
            this.editingUser = true
        },
        cancelEditing(){
            this.userEditing = new User('','','','','')
            this.editingUser = false
        },
        removeUser(user){
            this.userToDelete = user
            this.remove = true
        },
        cancelRemove(){
            this.remove = false
            this.userToDelete
        },
        onRemoveUser(){
            this.$store.dispatch('user/removeUser', this.userToDelete._id)
            this.remove = false
            this.userToDelete = null
        }
    },
    computed:{
        users(){
            return this.$store.getters['user/getUsers']
        },
        roles(){
            return this.$store.getters['roles/getRoles']
        }
    }
}
</script>
