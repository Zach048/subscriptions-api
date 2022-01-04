<template>
    <div class="container">
        <div class="pt-5">
           {{profile}} 
        </div>
    </div>
</template>
<script>

import axios from 'axios';
import store from '../store';

export default {
    data() {
        return {
            subscriptions: []
        }
    },
    created() {
        this.all();
    },
    methods: {
        deleteSubscription: function(subscr) {
            if (confirm('Delete ' + subscr.name)) {
                this.$api.delete(process.env.VUE_APP_API+'subscriptions/'+subscr.id+'/')
                    .then( response => {
                        this.all();
                    });
            }
        },
        all: function () {
           this.$api.get(process.env.VUE_APP_API+'subscriptions/')
                .then( response => {
                    this.subscriptions = response.data
                });
        }
    },
    computed: {
    profile() {
      return this.$store.state.profile.username;
    },
  },
}
</script>