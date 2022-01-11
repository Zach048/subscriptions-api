<template>
  <div>
    <h1> Logging in with JHU </h1>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  methods: {
    handleOauthCallback() {
      const vm = this;
      axios
        .post('https://beta.govex.works/auth/oidc', { code: this.$route.query.code })
        .then((resp) => {
          console.log(resp);
          vm.$store.commit("SET_AUTH", resp);
          vm.$router.push("/index");
        });
    },
  },
  mounted() {
    this.handleOauthCallback();
  },
  // computed: {
  //   provider() {
  //     return this.$route.params.provider;
  //   },
  // },
};
</script>

<style lang="scss" scoped></style>
