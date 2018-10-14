<template>
    <v-card>
        <v-card-title
            class="headline blue white--text"
            >
            Create new Role
        </v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field
                    placeholder="Name role"
                    required
                    v-model="name"
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
                :disabled="!name"
                class="success"
                @click="addRole"
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
export default {
    data(){
        return {
            name: ''
        }
    },
    methods:{
        closeModal(){
            this.$emit('cancel', false)
        },
        addRole(){
            this.$store.dispatch('roles/storeRole', { name: this.name})
            this.$emit('cancel', false)
            this.name = ''
        }
    },
    
}
</script>
