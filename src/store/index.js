import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./auth";
import user from "./user";
import social from "./social";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    user,
    social
  }
})
