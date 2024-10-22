<template>
  <v-dialog>
    <Card>
      <template v-slot:title>
        {{ dialogStore.title }}
      </template>

      <template v-slot:text>
        {{ dialogStore.body }}
      </template>

      <template v-slot:actions>
        <v-spacer/>
        <v-btn color="secondary" tile>Cancelar</v-btn>
				<v-btn color="primary" tile>Aceptar</v-btn>
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
  }
})
</script>