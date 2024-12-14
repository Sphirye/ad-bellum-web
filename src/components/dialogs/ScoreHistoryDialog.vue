<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="display().mobile.value"
    :width="display().mobile.value ? '100%' : '650px'"
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
import { useDisplay } from 'vuetify';


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

  computed: {
    display() {
      return useDisplay;
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