<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { useAppStore } from './stores/app';

export default defineComponent({
  data() {
    return {
      appStore: useAppStore(),
      router: useRouter(),
    }
  },
  created() {
    this.appStore.loadSession()

    if (this.appStore.session.token == undefined) {
      this.router.push("/auth/login")
    }
  }
})


</script>
