<template>
<v-container>
  <v-card v-for="workspace in workspaces" :key="workspace.workspace_id">
    <v-card-title>{{workspace.name}}</v-card-title>
    <v-card-text>
      <span>Last Updated on : {{workspace.updated}}</span>
      <span>Description</span>
      <span>{{workspace.description}}</span>
    </v-card-text>
  </v-card>
</v-container>
</template>

<script>
import {
  mapState
} from 'vuex'

export default {
  computed: {
    ...mapState('Conversation', [
      'workspaces'
    ])
  }
}
</script>
