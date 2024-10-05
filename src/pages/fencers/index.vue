<template>
  <v-container fluid>
    <Card>
      <template v-slot:title>
        <v-btn variant="text" icon @click="$router.back()" class="mr-2" density="compact">
          <v-icon icon="mdi-arrow-left"/>
        </v-btn>
        Esgrimistas

        <v-spacer/>

        <v-btn color="primary" variant="flat">
          Añadir
        </v-btn>
      </template>

      <template v-slot:text>
        <v-data-table-virtual
          :headers="headers"
          :items="fencers.items"
        />
      </template>
    </Card>
  </v-container>
</template>

<script lang="ts">
import Handler from '@/handlers/Handler';
import { MultipleItem } from '@/handlers/interfaces/ContentUI';
import Fencer from '@/models/Fencer';
import FencerService from '@/services/FencerService';

export default defineComponent({
  data() {
    return {
      router: useRouter(),
      headers: [
        { title: 'Nombre', align: 'center', value: 'name' },
        { title: 'Fecha de creación', align: 'center', value: 'createdDate' },
        { title: 'Creado por', align: 'center', value: 'createdBy' },
      ] as any,
      fencers: { items: [], totalItems: 0 } as MultipleItem<Fencer>,
      loading: false
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
    }
  }
})
</script>