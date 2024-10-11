<template>
  <v-card
    :color="color"
  >
    <template v-slot:title>
      <div class="d-flex justify-space-between">

        <div class="d-flex flex-column">
          <span class="text-h6 font-weight-bold">
            {{  fencer == 1 ? 'Rojo' : 'Negro'  }}
          </span>

          <span
            class="text-subtitle-2 text-medium-emphasis d-inline-block text-truncate"
            :style="`max-width: ${vuetify.display.width > 420 ? '200px' : '70px'};`"
          >
            {{ fencer == 1 ? match.fencer_1 : match.fencer_2 }}
          </span>
        </div>

        <div class="d-flex flex-column">
          <span>
            <v-icon icon="mdi-check-bold" size="20"/>
            4
          </span>

          <span>
            <v-icon icon="mdi-alert" size="20"/>
            3
          </span>
        </div>
        
      </div>
    </template>


    <v-row no-gutters justify="center" v-if="false">
      <v-col cols="12" sm="6">
        <v-card-item class="my-0 py-0 text-center text-sm-start">
          <template v-slot:title>
            <v-icon icon="mdi-check-bold" size="20" class="mb-1"/>
            Puntuaciones
          </template>
    
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
      </v-col>

      <v-col cols="12" sm="6">
        <v-card-item class="my-0 pt-0 text-center text-sm-start">

          <template v-slot:title>
            <v-icon icon="mdi-alert" size="20" class="mb-1"/>
            Penalizaciones
          </template>
    
          <v-card-subtitle>
            -Atacó  despues del alto.
          </v-card-subtitle>
    
          <v-card-subtitle>
            -Le dijo marica al réreri.
          </v-card-subtitle>
        </v-card-item>
      </v-col>
    </v-row>

  </v-card>
</template>

<script lang="ts">
import Match from '@/models/Match';
import vuetify from '@/plugins/vuetify';
import { PropType } from 'vue';

export default defineComponent({
  props: {
    match: { type: Object as PropType<Match>, required: true },
    fencer: { type: Number, required: true },
    color: { type: String, required: true }
  },
  data() {
    return {
      vuetify: vuetify
    }
  }
})
</script>