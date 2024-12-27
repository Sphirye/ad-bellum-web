<template>
  <v-container>
      <Card v-if="state.scoreProfile.item.id">
        <template v-slot:title>
          <v-btn variant="text" icon @click="router.back()" class="mr-2" density="compact">
            <v-icon icon="mdi-arrow-left"/>
          </v-btn>
          <p class="text-truncate">
            Perfil
          </p>
        </template>

        <template v-slot:text>
          <ScoreProfileDetails
            :model="state.scoreProfile.item"
            :editable="false"
          />
        </template>
      </Card>
  </v-container>
</template>

<script lang="ts" setup>
import Handler from '@/handlers/Handler';
import ScoreProfile from '@/models/ScoreProfile';
import ScoreProfileService from '@/services/ScoreProfileService';

const router = useRouter()
const route = useRoute("/score-profiles/[id]/")

const state = reactive({
  loading: false,
  scoreProfile: { item: new ScoreProfile() },
})

async function refresh() {
  await Handler.getItem(state, state.scoreProfile, () =>
    ScoreProfileService.getScoreProfile(Number(route.params.id))
  )
}

onMounted(async () => {
  await refresh()
})

</script>