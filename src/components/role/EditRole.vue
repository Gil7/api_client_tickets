<template>
    <v-card>
        <v-card-title
            class="headline blue white--text"
            >
            Edit Role
        </v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field
                    placeholder="Name role"
                    required
                    v-model="role.name"
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
                :disabled="!role.name"
                class="success"
                @click="updateRole"
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
import Role from '../../models/Role.js'
export default {
    props:['role'],
    data(){
        return {}
    },
    
    methods:{
        cancelEditing(){
            this.$emit('cancelEditing', false)
        },
        updateRole(){
            this.$store.dispatch('roles/updateRole', this.role)
            this.$emit('cancelEditing', false)
            
        },
        
    },
    
}
</script>
