<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="display().mobile.value"
    :width="display().mobile.value ? '100%' : '650px'"
    :loading="loading"
  >
  <Card>
    <template v-slot:title>
      Editar Score

      <v-spacer/>

      <v-btn
        variant="text"
        @click="dialog = false"
        icon
      >
        <v-icon
          size="25"
          icon="mdi-close"
        />
      </v-btn>
    </template>

    <template v-slot:text>
      <v-form ref="form">
        <v-item-group selected-class="border-primary" class="mb-4">
          <v-row dense>
            <v-col cols="6">
              <v-card
                color="rgba(189,69,69,255)"
                :disabled="!isCleanScore()"
              >
                <template v-slot:title>
                  <div class="d-flex flex-shrink-0">
                    <v-checkbox
                        class="flex-shrink-0"
                        v-model="modelScore.scorerId"
                        :value="match.fencer_1_id"
                        :rules="[isCleanScore() ? rules.required : true]"
                        return-object
                        hide-details
                      /> 
                    <div class="d-flex flex-column flex-shrink-0">
                      <span class="text-h6 font-weight-bold">Rojo</span>
                      <span class="text-subtitle-2 text-medium-emphasis">{{match.fencer_1?.name}}</span>
                    </div>
                  </div>
                </template>
                <v-divider color="white" thickness="2" class="mx-1"/>
  
                <template v-slot:actions>
                  <v-btn
                    variant="outlined"
                    append-icon="mdi-alert-outline"
                    block
                  >
                    Penalizar
                  </v-btn>
                </template>
              </v-card>
            </v-col>
  
            <v-col cols="6">
              <v-card
                color="#494949"
                :disabled="!isCleanScore()"
              >
                <template v-slot:title>
                  <div class="d-flex">
                    <v-checkbox
                      class="flex-shrink-0"
                      v-model="modelScore.scorerId"
                      :value="match.fencer_2_id"
                      :rules="[isCleanScore() ? rules.required : true]"
                      return-object
                      hide-details
                    />
                    <div class="d-flex flex-column flex-shrink-0">
                      <span class="text-h6 font-weight-bold">Negro</span>
                      <span class="text-subtitle-2 text-medium-emphasis">{{match.fencer_2?.name}}</span>
                    </div>  
                  </div>
                </template>
                <v-divider color="white" thickness="2" class="mx-1"/>
  
                <template v-slot:actions>
                  <v-btn
                    variant="outlined"
                    append-icon="mdi-alert-outline"
                    block
                  >
                    Penalizar
                  </v-btn>
                </template>
              </v-card>
            </v-col>
          </v-row>
        </v-item-group>
      </v-form>
    </template>

    <template v-slot:actions>
      <v-spacer/>
      <v-btn flat @click="updateScore()">
        Editar
      </v-btn>
    </template>
  </Card>
  </v-dialog>
</template>

<script lang="ts">
import Handler from '@/handlers/Handler';
import Match from '@/models/Match';
import MatchScore, { Verdict } from '@/models/MatchScore';
import MatchScoreService from '@/services/MatchScoreService';
import Rules from '@/services/tools/Rules';
import { useDisplay } from 'vuetify';

export default defineComponent({
  props: {
    match: { type: Match, required: true },
    score: { type: MatchScore, required: true },
  },

  computed: {
    display() {
      return useDisplay;
    },

    rules() {
      return Rules
    },
  },

  data() {
    return {
      modelScore: new MatchScore(),
      dialog: false,
      loading: false,
    }
  },

  methods: {
    open() {
      this.dialog = true
      this.modelScore = this.score
    },

    isCleanScore() {
      return this.score.verdict == Verdict.POINT;
    },

    async updateScore() {
      let score = { item: new MatchScore() }
      await Handler.getItem(this, score, () =>
        MatchScoreService.updateScore(this, this.modelScore, this.score.id!)
      )
      this.dialog = false
    }
  }
})
</script>