<template>
<v-container fluid justify-center>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Workspaces</v-toolbar-title>
    </v-toolbar>
    <v-layout row wrap>
      <v-flex xs4 v-for="workspace in workspaces" :key="workspace.workspace_id">
        <v-card light height="198" class="workspace-card mt-1 mb-2 mr-1 ml-1">
          <v-toolbar class="indigo workspace-header">
            <v-toolbar-title>
              <h6>{{workspace.name}}</h6>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-title>
            <span class="grey--text">Last Updated :&nbsp;</span>
            <span>{{parseDate(workspace.updated)}}</span>
            <span class="description-title grey--text">Description :</span>
            <div class="description">{{workspace.description}}</div>
          </v-card-title>
          <v-card-actions class="workspace-card-btns">
            <v-spacer></v-spacer>
            <v-btn class="workspace-select-btn" @click="selectWorkspace(workspace)">SELECT</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</v-container>
</template>

<script>
import {
  mapState,
  mapMutations
} from 'vuex'
import moment from 'moment-timezone'
const tz = moment.tz.guess()

export default {
  computed: {
    ...mapState('Conversation', [
      'workspaces'
    ]),
    ...mapState('Config', [
      'modal',
      'dialog'
    ])
  },
  methods: {
    ...mapMutations('Conversation', [
      'setWorkspaceID'
    ]),
    ...mapMutations('Config', [
      'hideDialog',
      'hideModal'
    ]),
    selectWorkspace: function (workspace) {
      this.setWorkspaceID(workspace.workspace_id)
      console.log(this.dialog, this.modal)
      if (this.dialog) {
        this.hideDialog()
      } else {
        this.hideModal()
      }
    },
    parseDate: function (time) {
      return moment(time).tz(tz).format('YYYY/MM/DD')
    }
  }
}
</script>
<style>
.workspace-card {
  height: 192px
}

.workspace-header {
  height: 42px;
}

.description-title {
  width: 100%
}

.workspace-card-btns {
  width: 100%;
  position: absolute;
  bottom: 2px;
}

.workspace-select-btn {
  float: right;
}
</style>
