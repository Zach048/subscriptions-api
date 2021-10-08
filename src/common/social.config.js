const url = process.env.VUE_APP_API;

const oauth = {
  "google-oauth2": {
    url: "https://idp.jh.edu/idp/profile/oidc/authorize",
    params: {
      client_id: 'beta.govex.works/auth/oidc',
      response_type: "code",
      scope: "openid email",
      redirect_uri: 'beta.govex.works/auth/oidc/callback',
    },
  }
};

export default oauth;
