<template>
  <v-app>
    <AppHeaderBar v-model="drawer"/>
    <AppNavigationDrawer v-model="drawer"/>

    <v-main>
      <router-view />
    </v-main>

    <AppFooter/>
  </v-app>
</template>

<script lang="ts" setup>
  const drawer = ref<boolean>(false);
</script>