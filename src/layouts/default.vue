<template>
  <v-app>
    <AppHeaderBar v-model="drawer" v-if="appStore.session.token"/>
    <AppNavigationDrawer v-model="drawer" v-if="appStore.session.token"/>
    <Dialog/>

    <v-main>
      <router-view />
    </v-main>

    <AppFooter/>
  </v-app>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app';

  const drawer = ref<boolean>(false);
  const appStore = useAppStore();
</script>