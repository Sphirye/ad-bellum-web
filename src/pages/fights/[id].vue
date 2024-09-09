<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6">
        <MatchOverview/>
      </v-col>

      <v-col cols="12" sm="6">
        <v-card
          title="Detalles del combate"
          flat
        >
          <template v-slot:text>
            <v-timeline side="end">
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
