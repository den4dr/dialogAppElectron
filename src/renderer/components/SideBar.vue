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
    <v-divider></v-divider>
  </v-list>
</v-container>
</template>

<script>
import {
  mapState,
  mapActions,
  mapMutations
} from 'vuex'

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
  computed: {
    ...mapState('Config', [
      'testMode'
    ])
  },
  methods: {
    ...mapActions('Config', [
      'changeTestMode'
    ]),
    ...mapMutations('Config', [
      'hideDrawer'
    ]),
    selectMode: function (item) {
      this.changeTestMode(item.modeName)
      this.$router.push({
        name: item.modeName
      })
      this.hideDrawer()
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
