<template>
  <v-container>
    <v-row dense justify="center" align="center">
      <v-col cols="12">
        <v-data-table-virtual
          :headers="headers"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import FencerService from '@/services/FencerService';

export default defineComponent({
  data() {
    return {
      headers: [
        { title: 'Nombre', align: 'center', value: 'name' },
        { title: 'Fecha de creación', align: 'center', value: 'duration' },
        { title: 'Creado por', align: 'center', value: 'date' },
      ] as any,
      fencers: [],
    }
  },

  created() {
    FencerService.getFencers(this)
  }
})
</script>