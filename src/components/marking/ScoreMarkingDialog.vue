<template>
  <v-card
    border="white md"
    class="mx-auto border-md"
    color="#242424"
    fullscreen
    width="100%"
    :loading="loading"
  >
    <template v-slot:title>
      <div class="d-flex align-center justify-space-between text-medium-emphasis">
        Marcar Punto
        <v-btn
          @click="$emit('close')"
          icon="mdi-close"
          variant="text"
          density="compact"
        />
      </div>
    </template>

    <v-divider color="white" thickness="2" class="mx-2"/>

    <v-card-text>
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
                        v-model="score.scorerId"
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
                      v-model="score.scorerId"
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
  
  
        <v-row>
          <v-col cols="12">
  
            <v-select
              v-model="score.type"
              :rules="[isCleanScore() ? rules.required : true]"
              :disabled="!isCleanScore()"
              :items="pointTypes"
              item-title="name"
              item-value="value"
              rounded="0"
              label="Tipo de punto"
              variant="outlined"
              density="comfortable"
              hide-details
              dense
              class="mb-2"
            />
  
            <v-select
              rounded="0"
              label="Flanco"
              variant="outlined"
              density="comfortable"
              :items="flanks"
              hide-details
              dense
            />
  
            <div class="my-2">
              <v-switch
                v-model="score.afterblow"
                :disabled="!isCleanScore()"
                @change="onAfterblowChanged()"
                density="compact"
                color="primary"
                label="Afterblow"
                hide-details
                inset
              />
  
              <v-switch
                v-model="score.control"
                :disabled="!isCleanScore()"
                @change="onControlChanged()"
                density="compact"
                color="primary"
                label="Control"
                hide-details
                inset
              />
            </div>
  
            <v-divider color="white" thickness="2" class="mx-2"/>
  
            <div class="d-flex justify-space-between wrap">
              <v-switch
                v-model="score.verdict"
                :value="verdict.DOUBLE"
                :false-value="verdict.POINT"
                color="primary"
                label="Doble"
                hide-details
                inset
              />
  
              <v-switch
                v-model="score.verdict"
                :true-value="verdict.NO_EXCHANGE"
                :false-value="verdict.POINT"
                color="primary"
                label="No exchange"
                hide-details
                inset
              />
            </div>
          </v-col>
        </v-row>
      </v-form>

    </v-card-text>

    <v-card-actions>
      <v-spacer/>

      <v-btn variant="outlined" @click="postScore()" :loading="loading">
        Marcar
      </v-btn>
    </v-card-actions>
  </v-card>

</template>

<script lang="ts">
import Handler from '@/handlers/Handler';
import Match from '@/models/Match';
import MatchScore, { PointType, Verdict } from '@/models/MatchScore';
import MatchScoreService from '@/services/MatchScoreService';
import Rules from '@/services/tools/Rules';

export default defineComponent({
  props: {
    match: { type: Match, required: true },
    scores: { type: Array as PropType<Array<MatchScore>>, required: true },
  },
  data() {
    return {
      score: new MatchScore(),
      pointTypes: [
        { name: "Corte", value: PointType.CUT },
        { name: "Estocada", value: PointType.THRUST },
        { name: "Rebanada", value: PointType.SLICE },
      ],
      flanks: [
        "Cabeza/Superior",
        "Inferior",
        "Brazos",
      ],
      loading: false,
      verdict: Verdict,
      rules: Rules,
    }
  },

  created() {
    this.resetScore()
  },

  methods: {
    async postScore() {
      if (await this._isFormValid()) {
        let score = { item: new MatchScore() }
  
        await Handler.getItem(this, score, () =>
          MatchScoreService.postScore(this, this.score)
        )

        this.$emit('close')
      }
      
    },

    resetScore() {
      this.score = new MatchScore()
      this.score.matchId = this.match.id
      this.score.verdict = Verdict.POINT
    },

    isCleanScore() {
      return this.score.verdict == Verdict.POINT;
    },

    onAfterblowChanged() {
      if (this.score.afterblow) {
        this.score.control = false
      }
    },

    onControlChanged() {
      if (this.score.control) {
        this.score.afterblow = false
      }
    },

    async _isFormValid() {
        const { valid } = await (this.$refs['form'] as any).validate()
        return valid as boolean
      },
  },
})
</script>

<style>
.v-card-item {
  padding-bottom: 3px;
}
</style>