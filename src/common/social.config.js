const url = process.env.VUE_APP_API;

const oauth = {
  "jhu": {
    url: "https://idp.jh.edu/idp/profile/oidc/authorize",
    params: {
      client_id: 'beta.govex.works/auth/oidc', // change for prod 
      response_type: "code",
      scope: "openid profile",
      redirect_uri: 'https://subscriptions-vue.herokuapp.com/auth/oidc/callback', //change for prod
    },
  }
};

export default oauth;
