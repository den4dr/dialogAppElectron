const state = {
  drawer: false,
  modal: false,
  dialog: false
}

const mutations = {
  showDrawer: function (state) {
    state.drawer = true
  },
  hideDrawer: function (state) {
    state.drawer = false
  },
  setDrawer: function (state, status) {
    state.drawer = status
  },
  showModal: function (state) {
    state.modal = true
  },
  hideModal: function (state) {
    state.modal = false
  },
  setModal: function (state, status) {
    state.modal = status
  },
  showDialog: function (state) {
    state.dialog = true
  },
  hideDialog: function (state) {
    state.dialog = false
  },
  setDialog: function (state, status) {
    state.dialog = status
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
