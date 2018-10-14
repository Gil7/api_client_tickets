<template>
    <v-card>
        <v-card-title
            class="headline blue white--text"
            >
            
            Create new user
            <v-icon class="ml-3">
                account_circle
            </v-icon>
        </v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field
                    placeholder="Name"
                    required
                    v-model="newuser.name"
                >
                </v-text-field>
                <v-text-field
                    placeholder="LastName"
                    required
                    v-model="newuser.lastname"
                >
                </v-text-field>
                <v-text-field
                    placeholder="Email"
                    required
                    :type="'email'"
                    v-model="newuser.email"
                >
                </v-text-field>
                <v-text-field
                    placeholder="Password"
                    required
                    :type="'password'"
                    v-model="newuser.password"
                >
                </v-text-field>
                <v-select
                    :items="roles"
                    v-model="role"
                    label="Choose Role"
                    item-text="name"
                    item-value="_id"
                    required
                ></v-select>
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
                :disabled="invalidForm"
                class="success"
                @click="addUser"
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
import User from '../../models/User.js'
export default {
    data(){
        return {
            newuser: new User('','','','',''),
            role: ''
        }
    },
    methods:{
        closeModal(){
            this.$emit('cancel', false)
        },
        addUser(){
            this.newuser.role = this.role
            this.$store.dispatch('user/storeUser', this.newuser)
            this.$emit('cancel', false)
            this.newuser = new User()
        }
    },
    created(){
        console.log(this.roles, " ROLES...")
    },
    computed: {
        invalidForm(){
            return this.newuser.email == '' || this.newuser.password == '' || this.newuser.name == ''
        },
        roles(){
            return this.$store.getters['roles/getRoles']
        }
    }
}
</script>
