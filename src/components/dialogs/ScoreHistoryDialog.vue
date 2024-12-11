<template>
  <v-dialog
    v-model="dialog"
    fullscreen
  >
    <v-card>
      <template v-slot:title>
        Historial de puntos
      </template>

      <template v-slot:text>
        <v-timeline side="end" class="mr-auto">
          <FightScoreTimelineItem
            v-for="score in scores"
            :score="score"
          />
        </v-timeline>
      </template>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import MatchScore from '@/models/MatchScore';


export default defineComponent({
  props: {
    scores: { type: Array as PropType<Array<MatchScore>>, required: true },
  },
  data() {
    return {
      dialog: false,
      loading: false,
    }
  }
})
</script>