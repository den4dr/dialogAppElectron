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
            <span class="red--text text--accent-2" v-show="loginFailed">Oops. Looks like username or/and password are wrong.</span>
          </div>
          <v-text-field label="username" hint="Value of username in service-key" persistent-hint v-model="auth.username"></v-text-field>
          <v-text-field label="password" hint="Value of password in service-key" persistent-hint v-model="auth.password"></v-text-field>
          <v-flex xs11 sm6>
            <v-menu lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px">
              <v-text-field slot="activator" label="version by date" v-model="auth.version_date" prepend-icon="event" readonly></v-text-field>
              <v-date-picker v-model="auth.version_date" no-title scrollable actions>
                <template slot-scope="{ save, cancel }">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                    <v-btn flat color="primary" @click="save">OK</v-btn>
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
</v-container>
</template>

<script>
import {
  mapActions,
  mapMutations
} from 'vuex'

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
      menu: false
    }
  },
  methods: {
    ...mapActions('Conversation', ['initialize', 'getWorkspaces']),
    ...mapMutations('Conversation', ['logoff', 'setLogin']),
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
