<template>
  <v-data-table-virtual
    :items="[...Array(10)].map(() => sparring)"
    :headers="headers"
  >

  </v-data-table-virtual>
</template>

<script setup lang="ts">
  const headers = [
    { title: 'Esgrimistas', align: 'center', value: 'name' },
    { title: 'Duración', align: 'center', value: 'duration' },
    { title: 'Fecha', align: 'center', value: 'date' },
    { title: 'Dobles', align: 'center', value: 'doubles' },
  ]

  const sparring = { name: 'Juan / Carlos', duration: '5m 30s', date: '10/10/2024', doubles: '2' }
</script>