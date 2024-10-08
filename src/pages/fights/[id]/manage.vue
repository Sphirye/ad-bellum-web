<template>
  <v-container fluid>
    <v-col cols="12">
      <MarkingComponent :match="match.item"/>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import Handler from '@/handlers/Handler';
import { SingleItem } from '@/handlers/interfaces/ContentUI';
import Match from '@/models/Match';
import MatchService from '@/services/MatchService';

export default defineComponent({
  data() {
    return {
      route: useRoute(),
      match: { item: new Match() } as SingleItem<Match>,
      loading: false,
    }
  },

  created() {
    this.getMatch()
  },

  methods: {
    async getMatch() {
      const id = (this.route.params as any).id
      if (id) {        
        await Handler.getItem(this, this.match, () =>
           MatchService.getMatch(this, id)
        );
      }
    }
  }
})
</script>