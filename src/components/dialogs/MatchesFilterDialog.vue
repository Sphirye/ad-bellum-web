<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    max-width="1024px"
  >
  <Card>
    <template v-slot:title>
      Filtrar matches
    </template>

    <template v-slot:text>
      <v-form ref="form">
        <v-row no-gutters>
          <v-col cols="12" class="d-flex flex-row align-center">
            <v-autocomplete
              v-model="matchFilter.fencer_1_id"
              :items="fencers.items"
              item-value="id"
              item-title="name"
              variant="outlined"
              hide-details
              single-line
              label="Esgrimista"
              clearable
            />
  
            <v-chip
              variant="flat"
              color="red-darken-3"
              class="mx-2"
            >
              VS
            </v-chip>
  
            <v-autocomplete
              v-model="matchFilter.fencer_2_id"
              :items="fencers.items"
              item-value="id"
              item-title="name"
              variant="outlined"
              hide-details
              single-line
              label="Esgrimista"
              :rules="[(matchFilter.fencer_1_id != matchFilter.fencer_2_id)]"
              clearable
            />
          </v-col>
  
          <v-col cols="6">
            <v-col>
              <v-checkbox label="Dobleout"/>
            </v-col>
          </v-col>
        </v-row>
      </v-form>
    </template>

    <template v-slot:actions>
      <v-btn @click="dialog = false">
        Cancelar
      </v-btn>

      <v-spacer/> 

      <v-btn @click="search()">
        Buscar
      </v-btn>
    </template>
  </Card>
  </v-dialog>
</template>

<script lang="ts">
import Handler from '@/handlers/Handler';
import { MultipleItem } from '@/handlers/interfaces/ContentUI';
import Fencer from '@/models/Fencer';
import Match from '@/models/Match';
import FencerService from '@/services/FencerService';

export default {
  props: {
    matchFilter: { required: true, type: Match },
  },
  data() {
    return {
      loading: false,
      dialog: false,
      fencers: { items: [], totalItems: 0 } as MultipleItem<Fencer>,
    }
  },

  created() {
    this.getFencers()
  },

  methods: {
    async getFencers() {
      await Handler.getItems(this, this.fencers, () =>
        FencerService.getFencers(this)
      )
    },

    async search() {
      if (await this._isFormValid()) {
        this.$emit('search');
        this.dialog = false;
      }
    },

    async _isFormValid() {
      const { valid } = await (this.$refs['form'] as any).validate()
      return valid as boolean
    },
  },
}

</script>