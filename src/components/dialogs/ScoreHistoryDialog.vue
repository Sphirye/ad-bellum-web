<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="display().mobile.value"
    :width="display().mobile.value ? '100%' : '650px'"
  >
    <Card>
      <template v-slot:title>
        Historial de puntos
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
        <div>
          <div class="text-center">Inicio del combate</div>
          <v-timeline
            side="end"
            class="mr-auto my-8"
            truncate-line="both"
          >
            <FightScoreTimelineItem
              v-for="score in scores"
              :match="match"
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
import Match from '@/models/Match';
import MatchScore from '@/models/MatchScore';
import { useDisplay } from 'vuetify';


export default defineComponent({
  props: {
    match: { type: Match, required: true },
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