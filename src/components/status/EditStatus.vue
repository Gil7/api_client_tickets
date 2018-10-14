<template>
    <v-card>
        <v-card-title
            class="headline blue white--text"
            >
            Edit Status
        </v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field
                    placeholder="Name status"
                    required
                    v-model="status.status"
                >
                </v-text-field>
                <v-select
                    :items="items"
                    v-model="status.active"
                    label="Solo field"
                    item-text="status"
                    item-value="value"
                    solo
                ></v-select>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="error"
                @click="cancelEditing"
                >
                Cancel
                <v-icon>
                    cancel
                </v-icon>
            </v-btn>
            
            <v-btn
                :disabled="!status.status"
                class="success"
                @click="updateStatus"
                >
                Update
                <v-spacer></v-spacer>
                <v-icon>
                    refresh
                </v-icon>
            </v-btn>
        </v-card-actions>

    </v-card>
</template>
<script>
import Status from '../../models/Status.js'
export default {
    props:['status'],
    data(){
        return {
            items: [
                {
                    status: 'Active',
                    value:true,
                },
                {
                    status: 'Inactive',
                    value:false,
                }
            ]
        }
    },
    methods:{
        cancelEditing(){
            this.$emit('cancelEditing', false)
        },
        updateStatus(){
            this.$store.dispatch('status/updateStatus', this.status)
            this.$emit('cancelEditing', false)
        }
        
    },
    
}
</script>
