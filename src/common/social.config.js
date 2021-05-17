const url = process.env.VUE_APP_API;

const oauth = {
  "google-oauth2": {
    url: "https://accounts.google.com/o/oauth2/v2/auth",
    params: {
      client_id: '544259183679-ijbi8vh8sv4aneo5sqqe5pirhpn57ko7.apps.googleusercontent.com',
      response_type: "code",
      scope: "openid email",
      redirect_uri: 'http://127.0.0.1:8080/auth/google-oauth2/callback',
    },
  }
};

export default oauth;
