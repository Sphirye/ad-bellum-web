<template>
  <v-navigation-drawer v-model="drawer">
    <v-list>
      <v-list-item
        title="Inicio"
        @click="router.push('/')"
      />

      <v-list-item
        title="Combates"
        @click="router.push('/fights')"
      />

      <v-list-item
        title="Esgrimistas"
        @click="router.push('/fencers')"
      />

      <v-list-item
        title="Usuarios"
        @click="router.push('/users')"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
  const router = useRouter()
  const drawer = defineModel({required: true, type: Boolean})
</script>