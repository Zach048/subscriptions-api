<template>
  <div>
    <h1> Logging in with {{ provider }}... </h1>
  </div>
</template>

<script>
import axios from 'axios';
import JwtService from "@/common/jwt.service";
export default {
  methods: {
    handleOauthCallback() {
      const vm = this;
      const provider = this.$route.params.provider;
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
  computed: {
    provider() {
      return this.$route.params.provider;
    },
  },
};
</script>

<style lang="scss" scoped></style>
