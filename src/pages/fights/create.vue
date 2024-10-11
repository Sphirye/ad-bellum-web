<template>
  <v-container fluid background-color="white">
    <v-row dense justify="center" align="center">

      <v-col cols="12">
        <v-sheet color="grey-darken-1" class="py-3 px-3 my-2">
          <v-btn variant="text" icon @click="router.back()" class="mr-2" density="compact">
            <v-icon icon="mdi-arrow-left"/>
          </v-btn>
          Crear combate
        </v-sheet>
      </v-col>

      <v-col cols="6">
        <v-select
          v-model="match.fencer_1_id"
          :items="fencers.items"
          item-title="name"
          item-value="id"
          rounded="0"
          label="Esgrimista 1"
          variant="outlined"
          density="comfortable"
          hide-details
          dense
        />
      </v-col>

      <v-col cols="6">
        <v-select
          v-model="match.fencer_2_id"
          :items="fencers.items"
          item-title="name"
          item-value="id"
          rounded="0"
          label="Esgrimista 2"
          variant="outlined"
          density="comfortable"
          hide-details
          dense
        />
      </v-col>

      <v-col cols="12">
        <v-slider
          :step="0.5"
          :ticks="seasons"
          min="0"
          max="4"
          show-ticks="always"
          thumb-label="always"
          variant="outlined"
          density="comfortable"
          hide-details
        />

        <v-spacer/>
      </v-col>

      <div style="width: 100%">
        <v-divider opacity="25" class="my-4"/>
        <div class="my-2 mx-3">Puntos:</div>
      </div>
      
      <v-col cols="4">
        <v-text-field
          rounded="0"
          variant="outlined"
          density="comfortable"
          hide-details
          dense
          label="Cortes"
          hint="Cantidad de puntos"
          type="input"
        />
      </v-col>

      <v-col cols="4">
        <v-text-field
          rounded="0"
          variant="outlined"
          density="comfortable"
          hide-details
          dense
          label="Rebanadas"
          hint="Cantidad de puntos"
          type="input"
        />
      </v-col>

      <v-col cols="4">
        <v-text-field
          rounded="0"
          variant="outlined"
          density="comfortable"
          hide-details
          dense
          label="Estocadas"
          hint="Cantidad de puntos"
          type="input"
        />
      </v-col>
    </v-row>

    <v-divider
      opacity="25"
      class="my-3"
    />

    <v-row dense>

      <v-spacer/>

      <v-btn
        color="primary"
        variant="flat"
        @click="createMatch()"
      >
        Crear
      </v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Handler from '@/handlers/Handler';
import { MultipleItem, SingleItem } from '@/handlers/interfaces/ContentUI';
import Fencer from '@/models/Fencer';
import Match from '@/models/Match';
import FencerService from '@/services/FencerService';
import MatchService from '@/services/MatchService';

export default defineComponent({
  data() {
    return {
      router: useRouter(),
      loading: false,

      match: new Match(),

      fencers: { items: [], totalItems: 0 } as MultipleItem<Fencer>,

      seasons: {
        0: '1 min',
        1: '2 min',
        2: '3 min',
        3: '4 min',
        4: '5 min',
      }
    }
  },

  created() {
    this.getFencers()
  },

  methods: {
    async getFencers() {
      await Handler.getItems(this, this.fencers, () =>
        FencerService.getFencers(this)
      )
    },

    async createMatch() {
      let response: SingleItem<Match> = { item: new Match() }

      await Handler.getItem(this, response, () =>
        MatchService.postMatch(this, this.match)
      )

      if (response.item.id) {
        this.router.push("/fights/" + response.item.id + "/manage")
      }
    }
  }
})
</script>