<template>
    <v-card>
    <v-card-title
        class="headline grey lighten-2"
        primary-title
    >
        Create new Ticket
    </v-card-title>

    <v-card-text>
        
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="red"
            flat
            @click="closeModal"
        >
            Cancel
        </v-btn>
        
        <v-btn
        color="blue"
        flat
        @click="addTicket"
        >
        Add
        </v-btn>
    </v-card-actions>
    </v-card>
</template>
<script>
export default {
    data(){
        return {
            
        }
    },
    methods: {
        addTicket(){
            console.log("add ticket")
        },
        closeModal(){
            this.$emit('cancel', false)
        }
    }
}
</script>
