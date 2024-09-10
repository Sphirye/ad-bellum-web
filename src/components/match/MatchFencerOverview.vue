<template>
  <v-card
    :color="color"
  >
    <template v-slot:title>
      <div class="d-flex justify-space-between">
        <div class="d-flex">
          <div class="d-flex flex-column">
            <span class="text-h6 font-weight-bold">
              {{  fencer == 1 ? 'Rojo' : 'Negro'  }}
            </span>

            <span class="text-subtitle-2 text-medium-emphasis">
              {{ fencer == 1 ? match.fencer_1 : match.fencer_2 }}
            </span>
          </div>
        </div>

        4 pts
      </div>
    </template>

    <v-divider color="grey-lighten-5" class="mx-3 mb-2"/>

    <v-card-item class="my-0 py-0" title="Puntuaciones">
      <v-card-subtitle>
        Estocadas: 1
      </v-card-subtitle>

      <v-card-subtitle>
        Cortes: 1
      </v-card-subtitle>

      <v-card-subtitle>
        Rebanadas: 1
      </v-card-subtitle>
    </v-card-item>
  </v-card>
</template>

<script lang="ts" setup>
import Match from '@/models/Match';
import { PropType } from 'vue';

defineProps({
  match: { type: Object as PropType<Match>, required: true },
  fencer: { type: Number, required: true },
  color: { type: String, required: true }
})
</script>