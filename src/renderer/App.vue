<template>
<v-app id="inspire" dark>
  <v-navigation-drawer clipped fixed v-model="drawer" app>
    <side-bar></side-bar>
  </v-navigation-drawer>
  <app-header></app-header>
  <v-content>
    <v-container fluid fill-height>
      <router-view></router-view>
    </v-container>
  </v-content>
  <v-footer app fixed>
    <span>&copy; 2017</span>
  </v-footer>
</v-app>
</template>

<script>
import {
  mapState,
  mapMutations
} from 'vuex'
import appHeader from '@/components/AppHeader'
import sideBar from '@/components/SideBar'

export default {
  name: 'dialog-tester-app',
  components: {
    'app-header': appHeader,
    'side-bar': sideBar
  },
  computed: {
    ...mapState('Conversation', ['isLogin']),
    drawer: {
      get: function () {
        return this.$store.state.Config.drawer
      },
      set: function (newValue) {
        this.setDrawer(newValue)
      }
    }
  },
  methods: {
    ...mapMutations('Config', ['setDrawer'])
  },
  props: {
    source: String
  }
}
</script>

<style>
/* CSS */
</style>
