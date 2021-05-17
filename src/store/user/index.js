/* eslint-disable no-unused-vars */

export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_ERROR = "USER_ERROR";

import Vue from "vue";
import { AUTH_LOGOUT } from "../auth";
import axios from 'axios';
// import VueCookies from 'vue-cookies';
// Vue.use(VueCookies)
// axios.defaults.headers.common['X-CSRFTOKEN'] = Vue.$cookies.get('csrftoken')
// axios.defaults.withCredentials = true
axios.defaults.headers.common = {'Authorization': 'Bearer' + localStorage.getItem('token')}


const state = {
  status: "",
  profile: {},
};

const getters = {
  getProfile: (s) => s.profile,
  isProfileLoaded: (s) => !!s.profile.name,
};

const actions = {
  [USER_REQUEST]: ({ dispatch, commit }) => {
    axios
      .get(process.env.VUE_APP_API+"users/profile/")
      .then((resp) => {
        const profile = resp.data;
        console.log(profile);
        commit(USER_SUCCESS, {
          username: profile.username,
        });
      })
      .catch((err) => {
        commit(USER_ERROR);
        dispatch(AUTH_LOGOUT);
      });
  },
};

const mutations = {
  [USER_REQUEST]: (s) => {
    s.status = "loading";
  },
  [USER_SUCCESS]: (s, resp) => {
    // s.status = "success";
    Vue.set(state, "profile", resp);
  },
  [USER_ERROR]: (s) => {
    s.status = "error";
  },
  [AUTH_LOGOUT]: (s) => {
    s.profile = {};
    s.status = "";
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
