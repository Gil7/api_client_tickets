<template>
    <v-card>
        <v-card-title
            class="headline blue white--text"
            >
            Create new Status
        </v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field
                    placeholder="Name status"
                    required
                    v-model="status.status"
                >

                </v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="error"
                @click="closeModal"
                >
                Cancel
                <v-icon>
                    cancel
                </v-icon>
            </v-btn>
            
            <v-btn
                :disabled="!status.status"
                class="success"
                @click="addStatus"
                >
                Add
                <v-spacer></v-spacer>
                <v-icon>
                    send
                </v-icon>
            </v-btn>
        </v-card-actions>

    </v-card>
</template>
<script>
import Status from '../../models/Status.js'
export default {
    data(){
        return {
            status : new Status('','','')
        }
    },
    methods:{
        closeModal(){
            this.$emit('cancel', false)
        },
        addStatus(){
            console.log(this.status)
            this.$store.dispatch('status/storeStatus', this.status)
            this.$emit('cancel', false)
            this.status = new Status('','','')
        }
    },
    
}
</script>
