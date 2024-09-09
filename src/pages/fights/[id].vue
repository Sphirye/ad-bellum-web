<template>
  <v-container fluid>
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
  </v-container>
</template>

<script lang="ts" setup>
import Score, { ExchangeType } from '@/models/Score';


let scores: Score[] = [
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
