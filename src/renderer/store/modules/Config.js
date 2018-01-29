const state = {
  drawer: false,
  modal: false,
  dialog: false,
  testMode: 'conversation-mode'
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
  },
  setTestMode: function (state, status) {
    state.testMode = status
  }
}

const actions = {
  changeTestMode: function ({commit}, testMode) {
    const modes = ['conversation-mode', 'intent-check-mode', 'dialog-test-mode']
    return new Promise(function (resolve, reject) {
      if (modes.indexOf(testMode) >= 0) {
        commit('setTestMode', testMode)
        resolve()
      } else {
        reject(new Error('Invalid name of test mode'))
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
