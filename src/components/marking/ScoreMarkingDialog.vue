<template>
  <v-card
		border="white md"
		class="mx-auto border-md"
    color="#242424"
  >
    <template v-slot:title>
      <div class="d-flex align-center justify-space-between text-medium-emphasis">
        Marcar Punto
        <v-btn
          icon="mdi-close"
          variant="text"
          density="compact"
         />
      </div>
    </template>

		<v-divider color="white" thickness="2" class="mx-2"/>

		<v-card-text>

      <v-item-group selected-class="border-primary" class="mb-4">
        <v-row dense>
          <v-item v-slot="{ selectedClass, toggle }">
            <v-col cols="6">
              <v-card
                :class="[selectedClass]"
                color="rgba(189,69,69,255)"
                @click="toggle"
              >
                <template v-slot:title>
                  <div class="d-flex justify-space-between">
                    <div class="d-flex flex-column">
                      <span class="text-h6 font-weight-bold">Rojo</span>
                      <span class="text-subtitle-2 text-medium-emphasis">Carlos</span>
                    </div>
                    <v-checkbox hide-details/>
                  </div>
                </template>
                <v-divider color="white" thickness="2" class="mx-1"/>
    
                <template v-slot:actions>
                  <v-btn
                    variant="outlined"
                    append-icon="mdi-alert-outline"
                    block
                  >
                    Penalizar
                  </v-btn>
                </template>
              </v-card>
            </v-col>
          </v-item>
  
          <v-col cols="6">
            <v-card color="#494949" @click="">
              <template v-slot:title>
                <div class="d-flex justify-space-between">
                  <div class="d-flex flex-column">
                    <span class="text-h6 font-weight-bold">Negro</span>
                    <span class="text-subtitle-2 text-medium-emphasis">Juan</span>
                  </div>  
                  <v-checkbox hide-details/>
                </div>
              </template>
              <v-divider color="white" thickness="2" class="mx-1"/>
  
              <template v-slot:actions>
                <v-btn
                  variant="outlined"
                  append-icon="mdi-alert-outline"
                  block
                >
                  Penalizar
                </v-btn>
              </template>
            </v-card>
          </v-col>
        </v-row>
      </v-item-group>


      <v-row>
        <v-col cols="12">

          <v-select
            v-model="score.type"
            :items="pointTypes"
            item-title="name"
            item-value="value"
            rounded="0"
            label="Tipo de punto"
            variant="outlined"
            density="comfortable"
            hide-details
            dense
            class="mb-2"
          />

          <v-select
            rounded="0"
            label="Flanco"
            variant="outlined"
            density="comfortable"
            :items="flanks"
            hide-details
            dense
          />

          <div class="my-2">
            <v-switch
              density="compact"
              color="primary"
              label="Afterblow"
              hide-details
              inset
            />
  
            <v-switch
              density="compact"
              color="primary"
              label="Control"
              hide-details
              inset
            />
          </div>

          <v-divider color="white" thickness="2" class="mx-2"/>

          <div class="d-flex justify-space-between wrap">
            <v-switch
              color="primary"
              label="Doble"
              hide-details
              inset
            />
  
            <v-switch
              color="primary"
              label="No exchange"
              hide-details
              inset
            />
          </div>
        </v-col>
      </v-row>
		</v-card-text>

    <v-card-actions>
      <v-btn variant="outlined" @click="postScore()">
        Marcar
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script lang="ts">
import Handler from '@/handlers/Handler';
import Match from '@/models/Match';
import MatchScore, { PointType, Verdict } from '@/models/MatchScore';
import MatchScoreService from '@/services/MatchScoreService';

export default defineComponent({
  props: {
    match: { type: Match, required: true },
    scores: { type: Array as PropType<Array<MatchScore>>, required: true },
  },
  data() {
    return {
      score: new MatchScore(),
      pointTypes: [
        { name: "Corte", value: PointType.CUT },
        { name: "Estocada", value: PointType.THRUST },
        { name: "Rebanada", value: PointType.SLICE },
      ],
      flanks: [
        "Cabeza/Superior",
        "Inferior",
        "Brazos",
      ],
      loading: false,
    }
  },

  created() {
    this.resetScore()
  },

  methods: {
    async postScore() {
      let score = { item: new MatchScore() }

      await Handler.getItem(this, score, () =>
        MatchScoreService.postScore(this, this.score)
      )
    },

    resetScore() {
      this.score = new MatchScore()
      this.score.matchId = this.match.id
      this.score.verdict = Verdict.POINT
    }
  }
})
</script>

<style>
.v-card-item {
  padding-bottom: 3px;
}
</style>