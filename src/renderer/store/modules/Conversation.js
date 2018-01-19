import Conversation from 'watson-developer-cloud/conversation/v1'
import {promisify} from 'util'

const state = {
  userid: null,
  password: null,
  vesion: null,
  conversation: null,
  workspaces: null,
  workspaceID: null,
  isLogin: false
}

const mutations = {
  setAuth (state, auth) {
    state.userid = auth.userid
    state.password = auth.password
    state.version = auth.version === undefined ? Conversation.VERSION_DATE_2017_05_26 : auth.version
    state.isLogin = true
  },
  setWorkspaces (state, workspaces) {
    state.workspaces = workspaces
  },
  setWrokspaceID (state, workspaceID) {
    state.workspaceID = workspaceID
  },
  logoff (state) {
    state.userid = null
    state.password = null
    state.version = null
    state.convesation = null
    state.isLogin = false
  },
  initConversation (state) {
    if (state.userid && state.password) {
      state.conversation = new Conversation({
        username: state.userid,
        password: state.password,
        version_date: state.version
      })
    }
  }
}

const actions = {
  getWorkspaces ({state, commit}) {
    promisify(state.convesation.listWorkspaces)()
      .then(response => { commit('setWorkspaces', response.workspaces) })
      .catch(err => {
        console.error(err)
        commit('logoff')
      })
  },
  login ({store, commit}, auth) {
    commit('setAuth', auth)
    setTimeout(commit('initConversation'), 50)
  }
}

export default {
  state,
  mutations,
  actions
}
