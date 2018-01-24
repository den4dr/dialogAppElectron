<template>
<v-toolbar app fixed clipped-left>
  <div style="width:44px">
    <v-toolbar-side-icon v-show="isLogin" @click.stop="showDrawer"></v-toolbar-side-icon>
  </div>
  <v-toolbar-title>Watson Conversation Dialog Tester</v-toolbar-title>
</v-toolbar>
</template>

<script>
import {
  mapState,
  mapMutations
} from 'vuex'

export default {
  computed: {
    ...mapState('Conversation', ['isLogin'])
  },
  methods: {
    ...mapMutations('Config', ['showDrawer'])
  }
}
</script>
