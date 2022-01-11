export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_ERROR = "USER_ERROR";

import { AUTH_LOGOUT } from "../auth";
import api from '@/common/api.config' // must import api config because it is only global when used with components/views


const state = {
  errors: null,
  profile: {},
};

const getters = {
  getProfile: (s) => s.profile,
};

/* This was used for testing, for prod, may be better to send the store.auth.userId 
returned from authentication to the server to get the complete user object */
const actions = {
  [USER_REQUEST]: ({ dispatch, commit }) => {
    api.get(process.env.VUE_APP_API+"users/profile/")
      .then((resp) => {
        commit(USER_SUCCESS, resp);
      })
      .catch((err) => {
        commit(USER_ERROR, err);
        dispatch(AUTH_LOGOUT);
      });
  },
};

const mutations = {
  [USER_SUCCESS]: (s, resp) => {
    s.profile = resp.data;
  },
  [USER_ERROR]: (s, err) => {
    s.errors = err;
  },
  [AUTH_LOGOUT]: (s) => {
    s.profile = {};
    s.errors = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
