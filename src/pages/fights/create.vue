<template>
  <v-container fluid background-color="white">
    <v-form ref="form">
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
            :rules="[rules.required]"
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
            :rules="[rules.required]"
          />
        </v-col>
  
        <v-col cols="12">
          <v-autocomplete
            v-model="match.scoreProfile"
            :items="scoreProfiles.items"
            return-object
            item-title="name"
            rounded="0"
            label="Perfil de Puntos"
            variant="outlined"
            density="comfortable"
            hide-details
            dense
          />
        </v-col>
      </v-row>
  
      <ScoreProfileDetails
        :model="match.scoreProfile"
        :editable="true"
        hide-name
      />
  
      <v-divider
        opacity="50%"
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
    </v-form>
  </v-container>
</template>

<script lang="ts">
import Handler from '@/handlers/Handler';
import { MultipleItem, SingleItem } from '@/handlers/interfaces/ContentUI';
import Fencer from '@/models/Fencer';
import Match from '@/models/Match';
import ScoreProfile, { ScoreProfileType } from '@/models/ScoreProfile';
import FencerService from '@/services/FencerService';
import MatchService from '@/services/MatchService';
import ScoreProfileService from '@/services/ScoreProfileService';
import Rules from '@/services/tools/Rules';

export default defineComponent({
  data() {
    return {
      router: useRouter(),
      loading: false,
      scoreProfileModel: undefined,
      match: new Match(),
      fencers: { items: [], totalItems: 0 } as MultipleItem<Fencer>,
      scoreProfiles: { items: [], totalItems: 0 } as MultipleItem<ScoreProfile>,
      rules: Rules,
    }
  },

  created() {
    this.getFencers()
    this.getScoreProfiles()
  },

  methods: {
    async getFencers() {
      await Handler.getItems(this, this.fencers, () =>
        FencerService.getFencers(this)
      )
    },

    async getScoreProfiles() {
      const template = new ScoreProfile()
      template.type = ScoreProfileType.TEMPLATE
      await Handler.getItems(this, this.scoreProfiles, () => ScoreProfileService.getScoreProfiles(template))
    },

    async createMatch() {
      if (await this.isFormValid()) {
        let response: SingleItem<Match> = { item: new Match() }
  
        await Handler.getItem(this, response, () =>
          MatchService.postMatch(this, this.match)
        )
  
        if (response.item.id) {
          this.router.push("/fights/" + response.item.id + "/manage")
        }
      }
    },

    async isFormValid() {
      const { valid } = await (this.$refs['form'] as any).validate()
      return valid as boolean
    },
  }
})
</script>