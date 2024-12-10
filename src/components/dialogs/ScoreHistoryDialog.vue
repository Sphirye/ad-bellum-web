<template>
  <v-dialog
    v-model="dialog"
    fullscreen
  >
    <v-card>
      <template v-slot:title>
        Historial de puntos
      </template>

      <template v-slot:text>
      </template>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">

export default defineComponent({
  data() {
    return {
      dialog: false,
      loading: false,
    }
  }
})
</script>