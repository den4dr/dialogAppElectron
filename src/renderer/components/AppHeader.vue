<template>
<v-toolbar app fixed clipped-left>
  <v-toolbar-side-icon @click.stop="showDrawer"></v-toolbar-side-icon>
  <v-toolbar-title>Watson Conversation Dialog Tester</v-toolbar-title>
  <v-spacer></v-spacer>
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
