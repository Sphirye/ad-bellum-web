<template>
  <v-navigation-drawer v-model="drawer">
    <v-list>
      <v-list-item
        title="Inicio"
        @click="$router.push('/')"
      />

      <v-list-item
        title="Combates"
        @click="$router.push('/fights')"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
  const drawer = defineModel({required: true, type: Boolean})
</script>