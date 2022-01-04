export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_ERROR = "USER_ERROR";

import Vue from "vue";
import { AUTH_LOGOUT } from "../auth";
import axios from 'axios';


const state = {
  errors: null,
  profile: {},
};

const getters = {
  getProfile: (s) => s.profile,
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
  [USER_SUCCESS]: (s, resp) => {
    s.profile = resp.data;
  },
  [USER_ERROR]: (s) => {
    s.error = "error";
  },
  [AUTH_LOGOUT]: (s) => {
    s.profile = {};
    s.error = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
