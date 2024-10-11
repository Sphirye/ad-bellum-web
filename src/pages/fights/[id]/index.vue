<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12" sm="7" md="8">
        <MatchOverview/>
      </v-col>

      <v-col cols="12" sm="5" md="4">
        <Card>
          <template v-slot:title>
            Detalles del combate
          </template>

          <template v-slot:text>
            <v-timeline width="300px" side="end" class="mr-auto">
              <FightScoreTimelineItem v-for="score in scores" :score="score"/>
            </v-timeline>
          </template>
        </Card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import MatchScore from '@/models/MatchScore';


let scores: MatchScore[] = [
  {
    timestamp: "00:14",
    region: "Cabeza",
  },

  {
    timestamp: "00:28",
    region: "Cabeza",
  },

  {
    timestamp: "00:52",
    region: "Cabeza",
  }
]

</script>
