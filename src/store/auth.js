const initialStates = {
  user: null
};

export default {
  STATES: initialStates,
  ACTIONS: {
    SET_USER: ({ commit }, data) => {
      commit("MUTATION_USER", data);
    }
  },
  GETTERS: {
    USER: () => {
      return initialStates.user;
    }
  },
  MUTATIONS: {
    USER: (state, value) => {
      state.authState.user = value;
    }
  }
};
