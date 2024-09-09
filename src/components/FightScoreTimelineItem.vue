<template>
  <v-timeline-item dot-color="red-darken-3">
    <template v-slot:opposite>
      <span>{{score.time}}</span>
    </template>
    
    <v-card variant="flat" class="border-md">
      <template v-slot:text>
        <div class="d-flex">
          <div>
            <strong>{{score.exchange}}</strong>
            
            <div class="text-caption">
              {{score.region}}
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

<script lang="ts" setup>
import MatchScore from '@/models/MatchScore';
import { PropType } from 'vue';
  defineProps({
    score: {
      type: Object as PropType<MatchScore>,
      required: true
    }
  })
</script>