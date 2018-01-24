const state = {
  drawer: false
}

const mutations = {
  showDrawer: function (state) {
    state.drawer = true
  },
  setDrawer: function (state, status) {
    state.drawer = status
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
