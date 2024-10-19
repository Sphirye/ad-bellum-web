<template>
  <v-container fluid v-if="match.item.id">
    <v-row dense>
      <v-col cols="12" sm="7" md="8">
        <MatchOverview
          :match="match.item"
          :scores="scores.items"
        />
      </v-col>

      <v-col cols="12" sm="5" md="4">
        <Card>
          <template v-slot:title>
            Detalles del combate
          </template>

          <template v-slot:text>
            <v-timeline width="300px" side="end" class="mr-auto">
              <FightScoreTimelineItem v-for="score in scores.items" :score="score"/>
            </v-timeline>
          </template>
        </Card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Handler from '@/handlers/Handler';
import { MultipleItem, SingleItem } from '@/handlers/interfaces/ContentUI';
import Match from '@/models/Match';
import MatchScore from '@/models/MatchScore';
import MatchScoreService from '@/services/MatchScoreService';
import MatchService from '@/services/MatchService';

export default defineComponent({
  data() {
    return {
      route: useRoute(),
      match: { item: new Match() } as SingleItem<Match>,
      scores: { items: [], totalItems: 0 } as MultipleItem<MatchScore>,
      loading: false
    }
  },
  
  async created() {
    await this.getMatch()
    await this.getScores()

    console.log(this.match.item.fencer_1_id!)
  },

  methods: {
    async getMatch() {
      const id = (this.route.params as any).id

      await Handler.getItem(this, this.match, () =>
        MatchService.getMatch(this, id)
      )
    },

    async getScores() {
      const example = new MatchScore()

      example.matchId = (this.route.params as any).id

      await Handler.getItems(this, this.scores, () =>
        MatchScoreService.getScores(this, example)
      )
    }
  }
})
</script>
