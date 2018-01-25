<template>
<v-container fluid>
  <v-layout row wrap>
    <v-flex xs12 md6 offset-md3>
      <v-card>
        <v-toolbar color="indigo" dark>
          <v-toolbar-title>Authentication</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <h1 class="title indigo--text text--accent-1">Please enter a service key of Conversation</h1>
          <h2 class="subheading">Enter your "username" and "password" of "Conversation" instance you want to test.</h2>
          <div class="mb-4">
            <span class="error--text" v-show="loginFailed">Oops. Looks like username or/and password are wrong.</span>
          </div>
          <v-text-field label="username" hint="Value of username in service-key" persistent-hint v-model="auth.username"></v-text-field>
          <v-text-field label="password" hint="Value of password in service-key" persistent-hint v-model="auth.password" :append-icon="passwordInvisible ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (passwordInvisible = !passwordInvisible)" :type="passwordInvisible ? 'password' : 'text'">
          </v-text-field>
          <v-flex xs11 sm6>
            <v-menu lazy :close-on-content-click="true" v-model="menu" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px">
              <v-text-field slot="activator" label="version by date" v-model="auth.version_date" prepend-icon="event" readonly></v-text-field>
              <v-date-picker v-model="auth.version_date" no-title scrollable actions>
                <template slot-scope="{ save, cancel }">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                  </v-card-actions>
                </template>
              </v-date-picker>
            </v-menu>
          </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="login(auth)">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
  <v-dialog v-model="modal" persistent max-width="810">
    <workspace-modal></workspace-modal>
  </v-dialog>
</v-container>
</template>

<script>
import {
  mapActions,
  mapMutations
} from 'vuex'
import workspaceModal from '@/components/WorkspaceModal'

export default {
  name: 'login-page',
  data() {
    return {
      // TODO remember to delete before pushing
      auth: {
        username: null,
        password: null,
        version_date: null
      },
      loginFailed: false,
      menu: false,
      passwordInvisible: true
    }
  },
  components: {
    'workspace-modal': workspaceModal
  },
  computed: {
    modal: {
      get: function () {
        return this.$store.state.Config.modal
      },
      set: function (newValue) {
        this.setModal(newValue)
      }
    }
  },
  methods: {
    ...mapActions('Conversation', ['initialize', 'getWorkspaces']),
    ...mapMutations('Conversation', ['logoff', 'setLogin']),
    ...mapMutations('Config', ['showModal', 'setModal']),
    // action called when logging in
    login(auth) {
      this.initialize(auth)
        .then(() => {
          this.getWorkspaces()
            .catch(err => {
              this.logoff()
              this.loginFailed = true
              console.error(err)
            })
          return null
        })
        .then(() => {
          this.setLogin()
          this.showModal()
          this.loginFailed = false
          return null
        })
        .catch(err => {
          this.logoff()
          this.loginFailed = true
          console.error(err)
        })
    }

  }
}
</script>
<style>

</style>
