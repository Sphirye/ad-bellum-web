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

            <MatchesHistoryTable/>
          </template>
        </Card> 
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  export default defineComponent({
    data() {
      return {
        router: useRouter(),
      }
    }
  })
</script>