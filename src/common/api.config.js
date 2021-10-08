import axios from "axios";
import JwtService from "@/common/jwt.service";
import { AUTH_LOGOUT } from "../store/auth";
import { AUTH_REFRESH } from "../store/auth";
import store from "../store";

   const api =  axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 300000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const errorInterceptor = (error) => {
    var date = new Date();
    if (date.getDay() == 0 && date.toLocaleTimeString() == '12:00:00 PM') {
      store.dispatch(AUTH_LOGOUT);
    }
    console.log('error intercepted');
    const originalRequest = error.config;
    const status  = error.response.status;
    console.log('before 401: ' + JSON.stringify(error.config));
    if (status === 401) {
      return store.dispatch(AUTH_REFRESH).then(() => {
        const headerAuthorization = `Bearer ${JwtService.getAccessToken()}`;
        api.defaults.headers.Authorization = headerAuthorization;
        originalRequest.headers.Authorization = headerAuthorization;
        return axios(originalRequest);
      }).catch((error) => {
        // if token refresh fails, logout the user to avoid potential security risks.
        store.dispatch(AUTH_LOGOUT);
        return Promise.reject(error);
      });
    }
    return Promise.reject(error);
  }

  api.interceptors.request.use(function (config) {
    const token = JwtService.getAccessToken();
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

  api.interceptors.response.use(
    (response) => response, // this is for all successful requests.
    (error) => errorInterceptor(error), // handle the request
  );

  export default api;