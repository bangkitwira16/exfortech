import Vue from "vue";
import Vuex from "vuex";

import AuthStore from './auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authState: AuthStore.STATES,
  },
  mutations: {
    MUTATION_USER: AuthStore.MUTATIONS.USER,
  },
  actions: {
    SET_USER: AuthStore.ACTIONS.SET_USER
  },
  getters: {
    GET_USER: AuthStore.GETTERS.USER
  }
});
