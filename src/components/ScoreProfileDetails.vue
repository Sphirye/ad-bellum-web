<template>
  <v-form ref="form">
    <v-row dense>
      <v-col cols="12" class="me-auto" v-if="!hideName">
        <v-text-field
          v-model="props.model.name"
          variant="outlined"
          label="Nombre"
          hide-details="auto"
          :disabled="!isEditable"
          :rules="[rules.required]"                
        />
      </v-col>

      <v-col cols="12">
        <div class="d-flex align-center justify-center mt-2">

          <v-divider opacity="30%"/>
          <div class="text-subtitle-1 mx-6 text-medium-emphasis">
            Detalles
          </div>

          <v-divider opacity="30%"/>
        </div>
      </v-col>

      <v-col cols="12" sm="6">
        <v-number-input
          v-model="props.model.cuts"
          control-variant="split"
          :min="0"
          variant="outlined"
          label="Cortes"
          hide-details="auto"
          :disabled="!isEditable"
        />

        <v-number-input
          v-model="props.model.slices"
          control-variant="split"
          :min="0"
          variant="outlined"
          label="Rebanadas"
          hide-details="auto"
          class="my-2"
          :disabled="!isEditable"
        />

        <v-number-input
          v-model="props.model.thrusts"
          control-variant="split"
          :min="0"
          variant="outlined"
          label="Estocadas"
          hide-details="auto"
          :disabled="!isEditable"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-number-input
          v-model="props.model.timeLimitInSeconds"
          variant="outlined"
          control-variant="split"
          :min="0"
          :step="10"
          label="Tiempo (en segundos)"
          hide-details="auto"
          type="number"
          :disabled="!isEditable"
        />

        <v-number-input
          v-model="props.model.controls"
          variant="outlined"
          control-variant="split"
          :min="0"
          label="Controles del arma"
          hide-details="auto"
          class="my-2"
          :disabled="!isEditable"
        />

        <v-number-input
          v-model="props.model.dobleoutLimit"
          control-variant="split"
          :min="0"
          variant="outlined"
          label="Dobleout"
          hide-details="auto"
          :disabled="!isEditable"
        />
      </v-col>

      <div class="text-subtitle-2 mx-6 text-medium-emphasis" v-if="isEditable">
        Los campos editados serán aplicados solo a este combate, el perfil base se mantendrá igual. 
      </div>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
import ScoreProfile from '@/models/ScoreProfile';
import Rules from '@/services/tools/Rules';

const props = defineProps({
  model: { type: ScoreProfile, required: true },
  editable: { type: Boolean, required: false },
  hideName: { type: Boolean, required: false, default: false }
})

const rules = Rules
const isEditable = computed(() => {
  return props.editable
})

</script>