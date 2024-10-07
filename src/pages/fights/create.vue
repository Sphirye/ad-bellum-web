<template>
  <v-container fluid background-color="white">
    <v-row dense justify="center" align="center">

      <v-col cols="12">
        <v-btn variant="text" icon @click="router.back()" class="mr-2" density="compact">
          <v-icon icon="mdi-arrow-left"/>
        </v-btn>
        Crear combate
      </v-col>

      <v-col cols="6">
        <v-select
          rounded="0"
          label="Esgrimista 1"
          variant="outlined"
          density="comfortable"
          hide-details
          dense
        />
      </v-col>

      <v-col cols="6">
        <v-select
          rounded="0"
          label="Esgrimista 2"
          variant="outlined"
          density="comfortable"
          hide-details
          dense
        />
      </v-col>

      <v-col cols="12">
        <v-slider
          :step="0.5"
          :ticks="seasons"
          min="0"
          max="4"
          show-ticks="always"
          thumb-label="always"
          variant="outlined"
          density="comfortable"
          hide-details
        />

        <v-spacer/>
      </v-col>

      <div style="width: 100%">
        <v-divider opacity="25" class="my-4"/>
        <div class="my-2 mx-3">Puntos:</div>
      </div>
      
      <v-col cols="4">
        <v-text-field
          rounded="0"
          variant="outlined"
          density="comfortable"
          hide-details
          dense
          label="Cortes"
          hint="Cantidad de puntos"
          type="input"
        />
      </v-col>

      <v-col cols="4">
        <v-text-field
          rounded="0"
          variant="outlined"
          density="comfortable"
          hide-details
          dense
          label="Rebanadas"
          hint="Cantidad de puntos"
          type="input"
        />
      </v-col>

      <v-col cols="4">
        <v-text-field
          rounded="0"
          variant="outlined"
          density="comfortable"
          hide-details
          dense
          label="Estocadas"
          hint="Cantidad de puntos"
          type="input"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default defineComponent({
  data() {
    return {
      router: useRouter(),
      seasons: {
        0: '1 min',
        1: '2 min',
        2: '3 min',
        3: '4 min',
        4: '5 min',
      }
    }
  }
})
</script>