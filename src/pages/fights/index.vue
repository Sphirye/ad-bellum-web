<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="11">
        <Card>
          <template v-slot:title>
            Historial de Combates

            <v-spacer/>

            <v-btn
              class="mx-3"
              color="primary"
              variant="flat"
              @click="($refs['dialog'] as any).dialog = true"
            >
              Filtrar
            </v-btn>

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

              <template v-slot:item.createdDate="{ item }">
                {{ item.createdDate?.toFormat('DD') }}
              </template>

              <template v-slot:item.edit="{ item }">
                <v-icon
                  class="me-2"
                  @click="editItem(item)"
                >
                  mdi-information-outline
                </v-icon>
              </template>

            </v-data-table>
          </template>
        </Card> 
      </v-col>
    </v-row>
    <MatchesFilterDialog
      ref="dialog"
      @search="getMatches()"
      v-model:match-filter="matchFilter"
    />
  </v-container>
</template>

<script lang="ts">
import Handler from '@/handlers/Handler';
import { MultipleItem } from '@/handlers/interfaces/ContentUI';
import Match from '@/models/Match';
import MatchService from '@/services/MatchService';
import { useDisplay } from 'vuetify';

  export default defineComponent({
    data() {
      return {
        loading: false,
        dialog: false,
        matchFilter: new Match(),
        router: useRouter(),

        matches: { items: [], totalItems: 0 } as MultipleItem<Match>,

        headers: [
          { title: 'Esgrimistas', align: 'center', value: 'fencers' },
          { title: 'Duración', align: 'center', value: 'duration' },
          { title: 'Fecha', align: 'center', value: 'createdDate' },
          { title: 'Dobles', align: 'center', value: 'doubles' },
          { title: 'Edición', align: 'center', value: 'edit' },
        ] as any
      }
    },

    computed: {
      display() {
        return useDisplay;
      }
    },
    
    created() {
      this.getMatches()
    },

    methods: {
      async getMatches() {
        await Handler.getItems(this, this.matches, () =>
          MatchService.getMatches(this, this.matchFilter)
        )
      },

      editItem(item: any) {
        this.router.push("/fights/" + item.id)
      }
    }
  })
</script>