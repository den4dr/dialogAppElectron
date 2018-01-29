<template>
<v-container fluid>
  <v-layout>
    <v-flex xs6 mr-2>
      <v-card height="636">
        <v-toolbar dense>
          <v-toolbar-title>Input</v-toolbar-title>
        </v-toolbar>
        <v-container class="scroll-y" style="max-height: 584px" grid-list-md>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field light required box label="Text" v-model="cRequest.text"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field light box multi-line rows=10 label="Context" v-model="contextString" :rules="[isJson||'Context must be shape of json.']"></v-text-field>
            </v-flex>
            <v-flex xs3 offset-xs9>
              <v-btn @click="converse" :disabled="!formIsValid">Send</v-btn>
            </v-flex>
            <!-- Does not work yet
            <v-flex xs12>
              <v-layout>
                <v-flex xs12>
                  <v-card>
                    <v-toolbar dense>
                      <v-container fill-height>
                        <v-layout align-center>
                          <v-flex xs6>
                            <h4>Intents</h4>
                          </v-flex>
                          <v-flex xs1 offset-xs4>
                            <v-btn flat icon :disabled="isIrrelevant" @click="addIntent">
                              <v-icon>add_circle</v-icon>
                            </v-btn>
                          </v-flex>
                          <v-flex xs1>
                            <v-btn flat icon :disabled="cRequest.intents.length === 0" @click="removeIntent">
                              <v-icon>remove_circle</v-icon>
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-toolbar>
                    <v-container fluid grid-list-md>
                      <v-flex align-baseline xs3 offset-xs9>
                        <v-switch class="irrelevant-switch" label="Irrelevant" v-model="isIrrelevant"></v-switch>
                      </v-flex>
                      <v-layout v-for="iSetted in cRequest.intents" :key="iSetted.id">
                        <v-flex xs8>
                          <v-text-field light label="Intent" v-model="iSetted.intent"></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                          <v-text-field light label="Confidence" v-model="iSetted.confidence"></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-layout>
                <v-flex xs12>
                  <v-card>
                    <v-toolbar dense>
                      <v-container fill-height>
                        <v-layout align-center>
                          <v-flex xs6>
                            <h4>Intents</h4>
                          </v-flex>
                          <v-flex xs1 offset-xs4>
                            <v-btn flat icon @click="addEntity">
                              <v-icon>add_circle</v-icon>
                            </v-btn>
                          </v-flex>
                          <v-flex xs1>
                            <v-btn flat icon :disabled="cRequest.entities.length === 0" @click="removeEntity">
                              <v-icon>remove_circle</v-icon>
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-toolbar>
                    <v-container fluid grid-list-md>
                      <v-layout v-for="iSetted in cRequest.entities" :key="eSetted.id">
                        <v-flex xs5>
                          <v-text-field light label="Entity" v-model="eSetted.entity"></v-text-field>
                        </v-flex>
                        <v-flex xs5>
                          <v-text-field light label="Value" v-model="eSetted.value"></v-text-field>
                        </v-flex>
                        <v-flex xs2>
                          <v-text-field light label="Confidence" v-model="eSetted.confidence"></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
            till here -->
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
    <v-flex xs6 ml-2>
      <v-card height="636">
        <v-toolbar dense>
          <v-toolbar-title>Outputs</v-toolbar-title>
        </v-toolbar>
        <v-container class="scroll-y" style="max-height: 584px" grid-list-md>
          <v-layout>
            <v-flex xs12>
              <v-card light v-for="response in converseHistory" :key="response.id">
                <tree-view :data="removeId(response)" :options="treeViewOption(response)"></tree-view>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapActions
} from 'vuex'

const makeConversationRequest = function (text, context, intents, entities) {
  let request = {
    input: {
      text
    },
    context
  }
  if (intents.length) {
    if (intents[0].intent === 0) {
      request.intents = []
    } else {
      request.intents = intents
    }
  }
  if (entities.length) {
    if (entities[0].entity === 0) {
      request.entities = []
    } else {
      request.entities = intents
    }
  }
  return request
}

export default {
  data() {
    return {
      cRequest: {
        text: '',
        context: {},
        intents: [],
        entities: []
      },
      intentsNum: 0,
      entityNum: 0,
      contextString: '{}',
      isIrrelevant: false,
      warning: false
    }
  },
  computed: {
    ...mapState('Conversation', ['converseHistory']),
    isJson: function () {
      try {
        if (this.contextString.length === 0) {
          this.cRequest.context = {}
        } else {
          this.cRequest.context = JSON.parse(this.contextString.replace(/'/g, '"'))
        }
        return true
      } catch (e) {
        return false
      }
    },
    formIsValid: function () {
      return this.isJson && this.cRequest.text
    }
  },
  methods: {
    ...mapMutations('Conversation', ['appendConverseHistory']),
    ...mapActions('Conversation', ['getMessage']),
    converse: function () {
      const request = makeConversationRequest(this.cRequest.text, this.cRequest.context, this.cRequest.intents, this.cRequest.entities)
      this.getMessage(request)
        .then(response => {
          this.warning = false
          this.contextString = JSON.stringify(response.context)
          return this.appendConverseHistory(response)
        }).catch(err => {
          this.warning = true
          console.error(err)
        })
    },
    addIntent: function () {
      const intentTemplate = {
        id: this.cRequest.intents.length,
        intent: 0,
        confidence: 0
      }
      this.cRequest.intents.push(intentTemplate)
    },
    removeIntent: function () {
      this.cRequest.intents.pop()
    },
    addEntity: function () {
      const entityTemplate = {
        id: this.cRequest.entities.length,
        entity: 0,
        value: null,
        confidence: 0
      }
      this.cRequest.entities.push(entityTemplate)
    },
    removeEntity: function () {
      this.cRequest.entities.pop()
    },
    removeId: function (responseHistory) {
      let resp = Object.assign({}, responseHistory)
      delete resp['id']
      return resp
    },
    treeViewOption: function (response) {
      return {
        maxDepth: 1,
        rootObjectKey: response.id,
        modifiable: false
      }
    }
  }
}
</script>

<style scoped>
.irrelevant-switch {}
</style>
