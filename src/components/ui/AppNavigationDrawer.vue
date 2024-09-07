<template>
  <v-navigation-drawer v-model="drawer">
    <v-list>
      <v-list-item
        title="Inicio"
        @click="$router.push('/')"
      />

      <v-list-item
        title="Historial de Sparring"
        @click="$router.push('/sparring-history')"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
  const drawer = defineModel({required: true, type: Boolean})
</script>