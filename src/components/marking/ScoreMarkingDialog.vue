<template>
  <v-dialog
    v-model="state.dialog"
    persistent
    :fullscreen="state.display.mobile"
    :width="state.display.mobile ? '100%' : '650px'"
  >
    <v-card
      border="white md"
      class="mx-auto border-md"
      color="#242424"
      fullscreen
      width="100%"
      :loading="state.loading"
    >
      <template v-slot:title>
        <div class="d-flex align-center justify-space-between text-medium-emphasis">
          Marcar Punto
          <v-btn
            @click="state.dialog = false"
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
                  :disabled="!isCleanScore"
                >
                  <template v-slot:title>
                    <div class="d-flex flex-shrink-0">
                      <v-checkbox
                          class="flex-shrink-0"
                          v-model="state.score.scorerId"
                          :value="match.fencer_1_id"
                          :rules="[isCleanScore ? state.rules.required : true]"
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
                  :disabled="!isCleanScore"
                >
                  <template v-slot:title>
                    <div class="d-flex">
                      <v-checkbox
                        class="flex-shrink-0"
                        v-model="state.score.scorerId"
                        :value="match.fencer_2_id"
                        :rules="[isCleanScore ? state.rules.required : true]"
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
                v-model="state.score.type"
                :rules="[isCleanScore ? state.rules.required : true]"
                :disabled="!isCleanScore"
                :items="state.pointTypes"
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
                :items="state.flanks"
                hide-details
                dense
              />
    
              <div class="my-2">
                <v-switch
                  v-model="state.score.afterblow"
                  :disabled="!isCleanScore"
                  @change="onAfterblowChanged()"
                  density="compact"
                  color="primary"
                  label="Afterblow"
                  hide-details
                  inset
                />
    
                <v-switch
                  v-model="state.score.control"
                  :disabled="!isCleanScore"
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
                  v-model="state.score.verdict"
                  :value="state.verdict.DOUBLE"
                  :false-value="state.verdict.POINT"
                  color="primary"
                  label="Doble"
                  hide-details
                  inset
                />
    
                <v-switch
                  v-model="state.score.verdict"
                  :true-value="state.verdict.NO_EXCHANGE"
                  :false-value="state.verdict.POINT"
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

        <v-btn variant="outlined" @click="postScore()" :loading="state.loading">
          Marcar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script lang="ts" setup>
import Handler from '@/handlers/Handler';
import Match from '@/models/Match';
import MatchScore, { PointType, Verdict } from '@/models/MatchScore';
import MatchScoreService from '@/services/MatchScoreService';
import Rules from '@/services/tools/Rules';
import { useDisplay } from 'vuetify';
import { VForm } from 'vuetify/components';

const props = defineProps({
  match: { type: Match, required: true },
  scores: { type: Array as PropType<Array<MatchScore>>, required: true },
})

defineExpose({
  open
})

const state = reactive({
  dialog: false,
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
  display: useDisplay(),
})

const isCleanScore = computed(() => (state.score.verdict == undefined) || (state.score.verdict == Verdict.POINT))
const form = ref<InstanceType<typeof VForm> | null>(null);

async function postScore() {
  if (await isFormValid()) {
    state.score.matchId = props.match.id
    await Handler.sampleRequest(state, () =>
      MatchScoreService.postScore(state.score)
    )

    state.dialog = false
  }
}

function resetScore() {
  const newScore = new MatchScore()
  newScore.matchId = props.match.id
  newScore.verdict = Verdict.POINT
  state.score = newScore
}

function onAfterblowChanged() {
  if (state.score.afterblow) {
    state.score.control = false
  }
}

function onControlChanged() {
  if (state.score.control) {
    state.score.afterblow = false
  }
}

function open() {
  resetScore()
  state.dialog = true
  state.score = new MatchScore()
}

async function isFormValid() {
  return (await form.value?.validate())?.valid
}

resetScore()
</script>

<style>
.v-card-item {
  padding-bottom: 3px;
}
</style>