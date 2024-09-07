<template>
  <v-navigation-drawer v-model="drawer">
    
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
  const drawer = defineModel({required: true, type: Boolean})
</script>