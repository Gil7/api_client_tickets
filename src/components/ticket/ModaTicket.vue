<template>
    <v-card>
    <v-card-title
        class="headline blue white--text"
        primary-title
    >
        Create new Ticket
    </v-card-title>

    <v-card-text>
        <v-form>
            <v-icon>
                face
            </v-icon>
            <v-text-field
                v-model="customer"
                label="Customer"
                required
            >
            </v-text-field>
            <v-icon>
                group
            </v-icon>
            <v-text-field
                v-model="company"
                
                label="Company"
                required
            ></v-text-field>
            <v-icon>
                assignment
            </v-icon>
            <v-text-field
                v-model="description"
                label="Description"
                required
            ></v-text-field>
            
        </v-form>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="error"
            @click="closeModal"
        >
            Cancel
        </v-btn>
        
        <v-btn
        color="success"
        @click="addTicket"
        >
        {{statuses}}
        Add
        </v-btn>
    </v-card-actions>
    </v-card>
    
</template>
<script>
export default {
    props:['statuses'],
    data(){
        return {
            customer: '',
            company: '',
            subject:'',
            description:'',
            status:'',
            assigned:null,

        }
    },
    created(){
        
    },
    methods: {
        addTicket(){
            console.log("add ticket")
        },
        closeModal(){
            this.$emit('cancel', false)
        },
        
    }
}
</script>
