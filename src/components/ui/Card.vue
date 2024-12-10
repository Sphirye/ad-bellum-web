<template>
  <v-card
    variant="flat"
    border="opacity-25 md"
    :loading="loading"
  >

      <template v-if="$slots.title">
        <v-card-title>
          <v-sheet color="grey-darken-1" class="py-3 px-3 my-2">
            <v-row no-gutters align="center">
              <slot name="title"/>
            </v-row>
          </v-sheet>
        </v-card-title>

        <v-divider opacity="25" class="mx-9" v-if="$slots.text"/>
      </template>


      <template v-if="$slots.text">
        <v-card-text>
          <slot name="text"/>
        </v-card-text>

        <v-divider opacity="25" class="mx-3" v-if="$slots.actions"/>
      </template>


      <v-card-actions v-if="$slots.actions">
        <slot name="actions"/>
      </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
defineProps({
  loading: { type: Boolean, required: false }
})
</script>