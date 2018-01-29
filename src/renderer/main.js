import Vue from 'vue'
import Vuetify from 'vuetify'
import TreeView from 'vue-json-tree-view'

import App from './App'
import router from './router'
import store from './store'

import('vuetify/dist/vuetify.min.css')

Vue.use(Vuetify)
Vue.use(TreeView)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
