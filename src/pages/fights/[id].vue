<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12" sm="7" md="8">
        <MatchOverview/>
      </v-col>

      <v-col cols="12" sm="5" md="4">
        <v-card
          title="Detalles del combate"
          flat
        >
          <template v-slot:text>
            <v-timeline width="300px" side="end" class="mr-auto">
              <FightScoreTimelineItem v-for="score in scores" :score="score"/>
            </v-timeline>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import MatchScore, { ExchangeType } from '@/models/MatchScore';


let scores: MatchScore[] = [
  {
    time: "00:14",
    attackType: "Estocada",  
    region: "Cabeza",
    exchange: ExchangeType.POINT,
  },

  {
    time: "00:28",
    attackType: "Estocada",  
    region: "Cabeza",
    exchange: ExchangeType.DOUBLE
  },

  {
    time: "00:52",
    attackType: "Estocada",  
    region: "Cabeza",
    exchange: ExchangeType.POINT
  }
]

</script>
