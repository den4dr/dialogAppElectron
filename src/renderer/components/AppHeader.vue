<template>
<v-toolbar app fixed clipped-left>
  <v-toolbar-side-icon @click.stop="showDrawer"></v-toolbar-side-icon>
  <v-toolbar-title>Watson Conversation Dialog Tester</v-toolbar-title>
  <v-spacer></v-spacer>
  <div v-if="isLogin">
    <v-btn dark @click.native.stop="showDialog">Change Workspace</v-btn>
    <v-dialog v-model="dialog" max-width="810">
      <workspace-modal></workspace-modal>
    </v-dialog>
  </div>
</v-toolbar>
</template>

<script>
import {
  mapState,
  mapMutations
} from 'vuex'
import workspaceModal from '@/components/WorkspaceModal'

export default {
  components: {
    'workspace-modal': workspaceModal
  },
  computed: {
    ...mapState('Conversation', ['isLogin']),
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
    ...mapMutations('Config', ['showDrawer', 'showDialog', 'setDialog'])
  }
}
</script>
