<template>
	<v-container>
		<Card>
			<template v-slot:title>
				Historial de Perfiles

        <v-spacer/>

        <v-btn
          class="mx-3"
          color="primary"
          variant="flat"
          @click="($refs['dialog'] as any).open()"
        >
          Crear
        </v-btn>
			</template>

			<template v-slot:text>
				<v-data-table
					:headers="state.headers"
					:items="state.scoreProfiles.items"
				>

				<template v-slot:item.timeLimitInSeconds="{ item }">
					{{ item.timeLimitInSeconds }} seg
				</template>

				<template v-slot:item.createdDate="{ item }">
					{{ item.createdDate?.toISODate() }}
				</template>

				<template v-slot:item.edit="{ item }">
					<v-icon
						class="me-2"
						@click="editItem(item)"
					>
						mdi-information-outline
					</v-icon>
				</template>
				</v-data-table>
			</template>
		</Card>

    <CreateProfileDialog
	  @on-profile-created="refresh()"
      ref="dialog"
    />
	</v-container>
</template>

<script lang="ts" setup>
import Handler from '@/handlers/Handler';
import { MultipleItem } from '@/handlers/interfaces/ContentUI';
import ScoreProfile from '@/models/ScoreProfile';
import ScoreProfileService from '@/services/ScoreProfileService';

	const router = useRouter()

	const state = reactive({
		loading: false,
		scoreProfiles: { items: [], totalItems: 0 } as MultipleItem<ScoreProfile>,
		headers: [
			{ title: 'Nombre', align: 'center', value: 'name' },
			{ title: 'Fecha de Creación', align: 'center', value: 'createdDate' },
			{ title: 'Creado por', align: 'center', value: 'createdBy' },
			{ title: 'Edición', align: 'center', value: 'edit' },

		] as any,
	})

	async function refresh() {
		await Handler.getItems(state, state.scoreProfiles, () => ScoreProfileService.getScoreProfiles())
	}

	async function editItem(item: ScoreProfile) {
		router.push("/score-profiles/" + item.id)
	}

	onMounted(async () => {
		await refresh()
	})

</script>