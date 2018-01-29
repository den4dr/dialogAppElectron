import Conversation from 'watson-developer-cloud/conversation/v1'
import Promise from 'bluebird'

const state = {
  username: null,
  password: null,
  version_date: null,
  conversation: null,
  workspaces: null,
  workspaceID: null,
  isLogin: false,
  converseHistory: []
}

const mutations = {
  setAuth(state, auth) {
    state.userid = auth.username
    state.password = auth.password
    state.version = auth.version_date === null ? Conversation.VERSION_DATE_2017_05_26 : auth.version_date
  },
  setWorkspaces(state, workspaces) {
    state.workspaces = workspaces
  },
  setWorkspaceID(state, workspaceID) {
    state.workspaceID = workspaceID
  },
  logoff(state) {
    state.userid = null
    state.password = null
    state.version = null
    state.conversation = null
    state.isLogin = false
    state.converseHistory = []
  },
  setConversation(state) {
    state.conversation = new Conversation({
      username: state.userid,
      password: state.password,
      version_date: state.version
    })
  },
  setLogin(state) {
    state.isLogin = true
  },
  clearConverseHistory(state) {
    state.converseHistory = []
  },
  appendConverseHistory(state, converseResponse) {
    converseResponse.id = state.converseHistory.length
    state.converseHistory.unshift(converseResponse)
  }
}

const actions = {
  // action to set auth parms to conversation object
  initialize({
    state,
    commit
  }, auth) {
    return new Promise((resolve, reject) => {
      commit('setAuth', auth)
      if (state.userid != null && state.password != null && state.version != null) {
        commit('setConversation')
        resolve()
      } else {
        reject(new Error('username or password is missing'))
      }
    })
  },
  // action to get a list of workspaces in instance
  getWorkspaces({
    state,
    commit
  }) {
    return new Promise(function (resolve, reject) {
      state.conversation.listWorkspaces((err, response) => {
        if (err) {
          reject(err)
        } else {
          commit('setWorkspaces', response.workspaces)
          resolve()
        }
      })
    })
  },
  // action to send and recieve object to conversation
  getMessage({state}, conversationRequest) {
    conversationRequest['workspace_id'] = state.workspaceID
    return new Promise(function (resolve, reject) {
      if (conversationRequest.input.text) {
        state.conversation.message(conversationRequest, (err, response) => {
          if (err) {
            reject(err)
          } else {
            resolve(response)
          }
        })
      } else {
        reject(new Error('input text is missing or null'))
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
