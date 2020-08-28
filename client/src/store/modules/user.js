const state = () => ({
  jwt: "",
  state: ""
});

const mutations = {
  setJWT(state, { jwt }) {
    state.jwt = jwt;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
