<template>
  <Card :loading=loading>
    <template v-slot:title>
      Crear Esgrimista
      <v-spacer/>
      <v-btn
        variant="text"
        @click="$emit('close')"
      >
        <v-icon
          size="25"
          icon="mdi-close"
        />
      </v-btn>
    </template>

    <template v-slot:text>
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              v-model="model.name"
              label="Nombre"
              rounded="0"
              variant="outlined"
              density="comfortable"
              hide-details
            />
          </v-col>
        </v-row>
    </template>

    <template v-slot:actions>
      <v-btn
        @click="createFencer()"
        color="success"
        variant="flat"
        text="Crear"
      />
    </template>
  </Card>
</template>

<script lang="ts">
import Handler from '@/handlers/Handler';
import { SingleItem } from '@/handlers/interfaces/ContentUI';
import Fencer from '@/models/Fencer';
import FencerService from '@/services/FencerService';

export default defineComponent({
  data() {
    return {
      model: new Fencer(),
      loading: false
    }
  },
  methods: {
    async createFencer() {
      let fencer: SingleItem<Fencer> = { item: new Fencer }
      await Handler.getItem(this, fencer, () =>
        FencerService.postFencer(this, this.model)      
      )
      this.$emit('onFencerCreated')
    }
  }
})
</script>