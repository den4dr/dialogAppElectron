<template>
<v-app id="inspire" dark>
  <v-navigation-drawer clipped fixed v-model="drawer" app>
    <side-bar></side-bar>
  </v-navigation-drawer>
  <v-toolbar app fixed clipped-left>
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title>Watson Conversation Dialog Tester</v-toolbar-title>
  </v-toolbar>
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
import appHeader from '@/components/AppHeader'
import sideBar from '@/components/SideBar'

export default {
  name: 'dialog-tester-app',
  components: {
    'app-header': appHeader,
    'side-bar': sideBar
  },
  data: () => ({
    drawer: null
  }),
  props: {
    source: String
  }
}
</script>

<style>
/* CSS */
</style>
