<template>
  <v-container fluid>
    <v-col cols="12">
      <MarkingComponent
        :match="match.item"
        :scores="scores.items"
      />
    </v-col>
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
      scores: { items: [] } as MultipleItem<MatchScore>,
      loading: false,
    }
  },

  async created() {
    await this.getMatch()

    if (this.match.item.id) {
      await this.getMatchScores()
    }
  },

  methods: {
    async getMatch() {
      const id = (this.route.params as any).id
      if (id) {        
        await Handler.getItem(this, this.match, () =>
           MatchService.getMatch(this, id)
        );
      }
    },

    async getMatchScores() {
      const example = new MatchScore()
      example.matchId = this.match.item.id

      await Handler.getItems(this, this.scores, () =>
        MatchScoreService.getScores(this, example)
      )
    }
  }
})
</script>