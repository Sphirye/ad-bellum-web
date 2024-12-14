<template>
  <v-timeline-item dot-color="red-darken-3">
    <template v-slot:opposite>
      <span>{{score.timestamp}}</span>
    </template>
    
    <v-card variant="flat" class="border-md">
      <template v-slot:text>
        <div class="d-flex">
          <strong class="me-4">{{score.verdict}} </strong>

          <div v-if="isScorable">
            <strong>
              {{score.scorer?.name}}
            </strong>

            <v-divider class="my-2"/> 

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
              <template v-if="isScorable">
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
  </v-timeline-item>
</template>

<script lang="ts">
import Match from '@/models/Match';
import MatchScore, { Verdict } from '@/models/MatchScore';

export default defineComponent({
  props: {
    match: { type: Match, required: true },
    score: { type: MatchScore, required: true },
  },
  computed: {
    verdict() {
      return Verdict;
    },
    isScorable() {
      return (this.score.verdict != this.verdict.DOUBLE) && (this.score.verdict != this.verdict.NO_EXCHANGE);
    }
  }
})
</script>