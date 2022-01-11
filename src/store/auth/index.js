export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_ERROR = "AUTH_ERROR";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const AUTH_REFRESH = "AUTH_REFRESH";
export const PURGE_AUTH = "PURGE_AUTH";
export const SET_AUTH = "SET_AUTH";
export const AUTH_LOGIN = "AUTH_LOGIN";


import axios from "axios";
import Vue from "vue";
import { USER_REQUEST } from "../user";
import JwtService from "@/common/jwt.service";


const state = {
  errors: null,
  user: null,
  isAuthenticated: !!JwtService.getAccessToken()
};

const getters = {
  user: (s) => s.user,
  isAuthenticated: (s) => !!s.isAuthenticated,
};

const actions = {
  [AUTH_LOGIN]: ({ commit, dispatch }, user) =>
    new Promise((resolve, reject) => {
      axios
        .post(process.env.VUE_APP_API+"token/", user)
        .then((resp) => {
          dispatch(USER_REQUEST);
          console.log('user request dispatched');
          console.log(resp);
          commit(SET_AUTH, resp);
          resolve(resp);
        })
        .catch((err) => {
          commit(AUTH_ERROR, err);
          reject(err);
        });
    }),

  [AUTH_REFRESH]: ({ commit, dispatch }) =>
    new Promise((resolve, reject) => {
      axios
        .post(process.env.VUE_APP_API+"token/refresh/", {refresh: JwtService.getRefreshToken()})
        .then((resp) => {
          console.log('in auth');
          console.log(resp);
          commit(SET_AUTH, resp);
          console.log(JwtService.getAccessToken());
          console.log(JwtService.getRefreshToken());
          resolve(resp);
        })
        .catch((err) => {
          commit(AUTH_ERROR, err);
          reject(err);
        });
    }),

  [AUTH_LOGOUT]: ({ commit, dispatch, state }) => {
        commit(PURGE_AUTH);
    },
};

const mutations = {
  [SET_AUTH]: (state, payload) => {
    state.isAuthenticated = true;
    state.user = JSON.parse(atob(payload.data.access.split('.')[1]))['user_id'];
    state.errors = {};
    JwtService.saveAccessToken(payload.data.access);
    JwtService.saveRefreshToken(payload.data.refresh);
    console.log(state.user);
    console.log(JSON.parse(atob(payload.data.access.split('.')[1]))['user_id']);
  },
  [AUTH_ERROR]: (state, err) => {
    state.errors = err;
  },
  [PURGE_AUTH]: (state) => {
    JwtService.destroyAccessToken();
    JwtService.destroyRefreshToken();    
    state.isAuthenticated = false;
    state.user = null;
    state.errors = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
