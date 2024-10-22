<template>
  <v-dialog v-model="dialogStore.enabled" max-width="500px">
    <Card>
      <template v-slot:title>
        {{ dialogStore.title }}
      </template>

      <template v-slot:text>
        <span class="text-body-1 text-grey-lighten-3">
          {{ dialogStore.body }}
        </span>
      </template>

      <template v-slot:actions>
        <v-spacer/>
        <v-btn
          @click="dialogStore.enabled = false"
          color="secondary"
          tile
        >
          Cancelar
        </v-btn>

				<v-btn
          @click="accept()"
          color="primary"
          tile
        >
          Aceptar
        </v-btn>
      </template>
    </Card>
  </v-dialog>
</template>

<script lang="ts">
import { useDialogStore } from '@/stores/dialog';

export default defineComponent({
  data() {
    return {
      dialogStore: useDialogStore(),
    }
  },
  methods: {
    accept() {
      this.dialogStore.executeCallback()
      this.dialogStore.enabled = false
    }
  }
})
</script>