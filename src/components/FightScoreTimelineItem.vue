<template>
  <v-timeline-item :dot-color="scorerColor">
    <template v-slot:opposite>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            class="mx-2"
            variant="plain"
            v-bind="props"
            icon
          >
            <v-icon color="grey" icon="mdi-dots-horizontal"/>
          </v-btn>
        </template>

        <v-list class="border-thin rounded-lg">
          <v-list-item @click="($refs['dialog'] as any).open()">
            <template v-slot:title>
              <v-icon icon="mdi-pencil" class="mr-2"/>
              Editar Score
            </template>
          </v-list-item>

          <v-list-item @click="deleteScore()">
            <template v-slot:title>
              <v-icon icon="mdi-trash-can" class="mr-2"/>
              Eliminar Score
            </template>
          </v-list-item>
        </v-list>
      </v-menu>

      <span>{{score.createdDate?.hour}}:{{score.createdDate?.minute}}</span>
    </template>
    
    <v-card variant="flat" class="border-md">
      <template v-slot:text>
        <div class="d-flex">
          <strong class="me-4">{{ state.verdicts.find((v: any) => v.value == score.verdict).name}} </strong>

          <div v-if="state.isScorable">
            <strong>
              {{score.scorer?.name}}
            </strong>

            <v-divider class="my-2"/> 

            <div>
              {{ state.pointTypes.find((pt: any) => pt.value == score.type).name }}
            </div>

            <div class="text-caption" v-if="score.afterblow">
              Afterblow
            </div>

            <div class="text-caption" v-if="score.control">
              Control
            </div>
          </div>

        </div>

        <div class="d-flex" v-if="false">
          <div>
            <strong>{{score.verdict}} 
              <template v-if="state.isScorable">
                - {{score.scorer?.name}}
              </template>
            </strong>
            
            <div class="text-caption">
              {{score.type}}
            </div>

            <div class="text-caption" v-if="score.afterblow">
              Afterblow
            </div>

            <div class="text-caption text-grey" v-if="score.warnings">
              <v-icon icon="mdi-alert"/> Rojo - {{score.warnings}}
            </div>
          </div>
        </div>
      </template>
    </v-card>

    <ScoreEditDialog
      ref="dialog"
      :match="match"
      :score="score"
      @on-updated-score="emit('onUpdatedScore')"
    />
  </v-timeline-item>
</template>

<script lang="ts" setup>
import Handler from '@/handlers/Handler';
import Match from '@/models/Match';
import MatchScore, { PointType, Verdict } from '@/models/MatchScore';
import MatchScoreService from '@/services/MatchScoreService';


const props = defineProps({
  match: { type: Match, required: true },
  score: { type: MatchScore, required: true },
})

const emit = defineEmits(['onDeletedScore', 'onUpdatedScore'])
const scorerColor = computed(() => {
  if (props.score.scorerId == props.match.fencer_1_id) {
    return "red-darken-3"
  }

  if (props.score.scorerId == props.match.fencer_2_id) {
    return "grey-darken-4"
  }

  return "grey-darken-3"
})

const state = reactive({
  loading: false,
  isScorable: (props.score.verdict != Verdict.DOUBLE) && (props.score.verdict != Verdict.NO_EXCHANGE),
  verdicts: [
    { name: "Punto", value: Verdict.POINT },
    { name: "Doble", value: Verdict.DOUBLE },
    { name: "No Exchange", value: Verdict.NO_EXCHANGE },
    { name: "No Quality", value: Verdict.NO_QUALITY},
  ],
  pointTypes: [
    { name: "Corte", value: PointType.CUT },
    { name: "Rebanada", value: PointType.SLICE },
    { name: "Estocada", value: PointType.THRUST },
  ]
})

async function deleteScore() {
  await Handler.sampleRequest(state, () => MatchScoreService.delete(props.score.id!))
  emit('onDeletedScore')
}
</script>