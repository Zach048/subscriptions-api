const url = process.env.VUE_APP_API;

const oauth = {
  "jhu": {
    url: "https://idp.jh.edu/idp/profile/oidc/authorize",
    params: {
      client_id: 'beta.govex.works/auth/oidc',
      response_type: "code",
      scope: "openid email profile",
      redirect_uri: 'https://subscriptions-vue.herokuapp.com/auth/oidc/callback',
    },
  }
};

export default oauth;
