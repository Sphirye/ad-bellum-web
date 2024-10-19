<template>
  <v-timeline-item dot-color="red-darken-3">
    <template v-slot:opposite>
      <span>{{score.timestamp}}</span>
    </template>
    
    <v-card variant="flat" class="border-md">
      <template v-slot:text>
        <div class="d-flex">
          <div>
            <strong>{{score.verdict}} 
              <template v-if="score.verdict != verdict.DOUBLE">
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
import MatchScore, { Verdict } from '@/models/MatchScore';

export default defineComponent({
  props: {
    score: { type: MatchScore, required: true }
  },
  computed: {
    verdict() {
      return Verdict;
    },
  }
})
</script>