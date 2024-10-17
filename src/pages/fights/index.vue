<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="11">
        <Card>
          <template v-slot:title>
            Historial de Combates

            <v-spacer/>

            <v-btn
              color="primary"
              variant="flat"
              @click="router.push('/fights/create')"
            >
              Crear
            </v-btn>
          </template>

          <template v-slot:text>
            <v-text-field
              label="Buscar"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
            />

            <v-data-table
              :items="matches.items"
              :headers="headers"
              hover
            >

              <template v-slot:item.fencers="{ item }">
                <v-chip variant="flat" color="red-darken-3">
                  {{ item.fencer_1?.name }}
                </v-chip>

                <span class="px-3">vs</span>

                <v-chip variant="flat" color="grey-darken-3">
                  {{ item.fencer_2?.name }}
                </v-chip>
              </template>

            </v-data-table>
          </template>
        </Card> 
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Handler from '@/handlers/Handler';
import { MultipleItem } from '@/handlers/interfaces/ContentUI';
import Match from '@/models/Match';
import MatchService from '@/services/MatchService';

  export default defineComponent({
    data() {
      return {
        loading: false,
        router: useRouter(),

        matches: { items: [], totalItems: 0 } as MultipleItem<Match>,

        headers: [
          { title: 'Esgrimistas', align: 'center', value: 'fencers' },
          { title: 'Duración', align: 'center', value: 'duration' },
          { title: 'Fecha', align: 'center', value: 'date' },
          { title: 'Dobles', align: 'center', value: 'doubles' },
        ] as any
      }
    },

    created() {
      this.getMatches()
    },

    methods: {
      async getMatches() {
        await Handler.getItems(this, this.matches, () =>
          MatchService.getMatches(this)
        )
      }
    }
  })
</script>