<template>
    <div class="container">
        <div class="pt-5">
           {{getProfile.username}} 
        </div>
    </div>
</template>
<script>

import axios from 'axios';
import store from '../store';
import { mapGetters } from "vuex";

export default {
    computed: {
      ...mapGetters(["getProfile"]) // user mapGetters method to use an array of all your store getters
  },
}
</script>