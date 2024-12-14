<template>
  <v-dialog
    v-model="dialog"
    fullscreen
  >
    <Card>
      <template v-slot:title>
        Historial de puntos
      </template>

      <template v-slot:text>
        <div>
          <div class="text-center">Inicio del combate</div>
          <v-timeline
            side="end"
            class="mr-auto my-8"
            truncate-line="both"
          >
            <FightScoreTimelineItem
              v-for="score in scores"
              :score="score"
            />
          </v-timeline>
          <div class="text-center">Fin del combate</div>
        </div>
      </template>
    </Card>
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
  },

  watch: {
    dialog(newValue: boolean) {
      if (newValue) {
        this.$emit('refreshScores')
      }
    }
  }
})
</script>