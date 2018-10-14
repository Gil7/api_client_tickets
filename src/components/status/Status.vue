<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-icon>
            bookmark
        </v-icon>
        Statuses
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
        :items="statuses"
        :search="search"
      >
        <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.status }}</td>
            <td class="text-xs-left">
                <v-chip class="info">
                    {{ props.item.active ? 'Active'  : 'Inactive'}}
                </v-chip>
            </td>
            <td class="justify-center layout px-0">
                <v-icon
                    small
                    class="mr-2 blue--text"
                    @click="editStatus(props.item)"
                >
                    edit
                </v-icon>
                <v-icon
                    small
                    class="red--text"
                    @click="removeStatus(props.item)"
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
        v-model="editingStatus"
        width="500"
        >
          <edit-status
            :status="statusEditing"
            @cancelEditing="cancelEditing"
            >
            </edit-status>
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
                  Remove status
              </v-card-title>
            <v-card-text>
                <p v-if="statusToDelete">
                    Do you really want to delete this status:
                    {{statusToDelete.status}}
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
                    @click="onRemoveStatus"
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
        <new-status
            @cancel="closeModal">
        </new-status>
      </v-dialog>
    </v-card>
  </v-container>
</template>
<script>
import ModalNewStatus from './ModalNewStatus';
import EditStatus from './EditStatus';
import Status from '../../models/Status.js'
export default {
    components:{
        'new-status': ModalNewStatus,
        'edit-status' : EditStatus
    },
    data(){
        return {
            headers: [
                {
                    text: 'Name',
                    value: 'status'
                },
                {
                    text:'Status',
                    value:'active'
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
            statusToDelete: null,
            statusEditing: new Status('','',''),
            editingStatus: false
        }
    },
    created(){
        this.$store.dispatch('status/loadStatuses')
    },
    methods: {
        closeModal(closeModal){
            this.dialog = false
        },
        editStatus(status){
            this.statusEditing = status
            this.editingStatus = true
        },
        cancelEditing(){
            this.statusEditing = new Status('','','')
            this.editingStatus = false
        },
        removeStatus(status){
            this.statusToDelete = status
            this.remove = true
        },
        cancelRemove(){
            this.remove = false
            this.statusToDelete
        },
        onRemoveStatus(){
            this.$store.dispatch('status/removeStatus', this.statusToDelete._id)
            this.remove = false
            this.statusToDelete = null
        }
    },
    computed:{
        statuses(){
            return this.$store.getters['status/getStatuses']
        }
    }
}
</script>
