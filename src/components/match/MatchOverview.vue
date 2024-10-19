<template>
  <Card>
    <template v-slot:title>
      <v-btn variant="text" icon @click="router.back()" class="mr-2" density="compact">
        <v-icon icon="mdi-arrow-left"/>
      </v-btn>
      Vista General
    </template>
    <template v-slot:text>
      <v-row align="center" dense justify="center">

        <v-col cols="6">
          <MatchFencerOverview
            :match="match"          
            :fencer="match.fencer_1!"
            :scores="scores"
            color="rgba(189,69,69,255)"
            :card-color="1"
          />
        </v-col>

        <v-col cols="6">
          <MatchFencerOverview
            :match="match"          
            :fencer="match.fencer_2!"
            :scores="scores"
            color="#494949"
            :card-color="2"
          />
        </v-col>

        <v-col cols="12" v-if="false">
          <v-card variant="flat" border="opacity-25 sm" max-width="500px">
            <v-card-text>
              <v-card-item class="d-flex py-0">
                <v-icon icon="mdi-clock" class="pb-2"/>
                <span class="text-h5 mx-2">Duración:</span>
                <span class="text-h5">03:35</span>
              </v-card-item>
    
              <v-card-item class="d-flex py-0">
                <v-icon icon="mdi-close" class="pb-2"/>
                <span class="text-h5 mx-2">Dobles:</span>
                <span class="text-h5">2</span>
              </v-card-item>
    
              <v-card-item class="d-flex py-0">
                <v-icon icon="mdi-alert" class="pb-2"/>
                <span class="text-h5 mx-2">Penalizaciones:</span>
                <span class="text-h5">2</span>
              </v-card-item>
            </v-card-text>
          </v-card>
        </v-col>

      </v-row>
    </template>
  </Card>
</template>

<script lang="ts">
import Match from '@/models/Match';
import MatchScore from '@/models/MatchScore';

export default defineComponent({
  props: {
    match: { type: Match, required: true },
    scores: { type: Array as PropType<Array<MatchScore>>, required: true },
  },
  data() {
    return {
      router: useRouter(),
    }
  }
})
</script>