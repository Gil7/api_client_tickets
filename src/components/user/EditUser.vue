<template>
    <v-card>
        <v-card-title
            class="headline blue white--text"
            >
            Edit User
        </v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field
                    placeholder="Name role"
                    required
                    v-model="user.name"
                >
                </v-text-field>
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
                :disabled="!user.name"
                class="success"
                @click="updateUser"
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
import User from '../../models/User.js'
export default {
    props:['user'],
    data(){
        return {}
    },
    methods:{
        cancelEditing(){
            this.$emit('cancelEditing', false)
        },
        updateUser(){
            this.$store.dispatch('user/updateUser', this.user)
            this.$emit('cancelEditing', false)
        },
        
    },
    
}
</script>
