<template>
<v-container>
  <v-list avatar two-line>
    <v-list-tile v-for="item in testModes" :key="item.modeName" @click="selectMode(item)">
      <v-list-tile-avatar>
        <v-icon :class="[item.modeName == testMode?'indigo lighten-1 white--text' : 'grey lighten-1 white--text']">{{item.modeIcon}}</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{item.modeTitle}}</v-list-tile-title>
        <v-list-tile-sub-title>{{item.modeSubTitle}}</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
  <v-divider></v-divider>
  <v-list dense>
    <v-list-tile :disabled="!isLogin" @click.stop="showDialog">
      <v-list-tile-avatar>
        <v-icon>exit_to_app</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>Change Workspace</v-list-tile-content>
    </v-list-tile>
    <v-list-tile :disabled="!isLogin" @click="logout">
      <v-list-tile-avatar>
        <v-icon>exit_to_app</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>Logoff</v-list-tile-content>
    </v-list-tile>
  </v-list>
  <v-dialog v-if="isLogin" v-model="dialog" max-width="810">
    <workspace-modal></workspace-modal>
  </v-dialog>
</v-container>
</template>

<script>
import {
  mapState,
  mapActions,
  mapMutations
} from 'vuex'

import workspaceModal from '@/components/WorkspaceModal'

export default {
  data() {
    return {
      testModes: [
        {
          modeName: 'conversation-mode',
          modeIcon: 'chat_bubble',
          modeTitle: 'Conversation Mode',
          modeSubTitle: 'Check by interective conversation.'
        },
        {
          modeName: 'intent-check-mode',
          modeIcon: 'chat_bubble',
          modeTitle: 'Intent Check Mode',
          modeSubTitle: 'Check Intent and Confidency by list.'
        },
        {
          modeName: 'dialog-test-mode',
          modeIcon: 'chat_bubble',
          modeTitle: 'Dialog Test Mode',
          modeSubTitle: 'Compare output with certain input.'
        }
      ]
    }
  },
  components: {
    'workspace-modal': workspaceModal
  },
  computed: {
    ...mapState('Config', [
      'testMode'
    ]),
    ...mapState('Conversation', [
      'isLogin'
    ]),
    dialog: {
      get: function () {
        return this.$store.state.Config.dialog
      },
      set: function (newValue) {
        this.setDialog(newValue)
      }
    }
  },
  methods: {
    ...mapActions('Config', [
      'changeTestMode'
    ]),
    ...mapMutations('Config', [
      'hideDrawer', 'showDialog', 'setDialog'
    ]),
    ...mapMutations('Conversation', [
      'logoff'
    ]),
    selectMode: function (item) {
      this.changeTestMode(item.modeName)
      this.hideDrawer()
      if (this.isLogin) {
        this.$router.push({
          name: item.modeName
        })
      }
    },
    logout: function () {
      this.logoff()
      this.$router.push({
        name: 'login-page'
      })
    }
  }
}
</script>
<style>
.workspace-header {
  height: 42px;
}

.workspace-description {
  width: 100%
}
</style>
