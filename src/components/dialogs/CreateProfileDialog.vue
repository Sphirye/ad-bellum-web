<template>
  <v-dialog
    v-model="state.dialog"
    :fullscreen="useDisplay().mobile.value"
    :width="useDisplay().mobile.value ? '100%' : '650px'"
  >
    <Card>
      <template v-slot:title>
        Crear Perfil de Puntos

        <v-spacer/>

        <v-btn
          variant="text"
          @click="state.dialog = false"
          icon
        >
          <v-icon
            size="25"
            icon="mdi-close"
          />
        </v-btn>
      </template>

      <template v-slot:text>
        <v-form ref="form">
          <v-row dense>
            <v-col cols="12" class="me-auto">
              <v-text-field
                v-model="state.model.name"
                variant="outlined"
                label="Nombre"
                hide-details="auto"
                :rules="[state.rules.required]"                
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
  
            <v-col cols="6">
              <v-number-input
                v-model="state.model.cuts"
                control-variant="split"
                :min="0"
                variant="outlined"
                label="Cortes"
                hide-details="auto"
              />
  
              <v-number-input
                v-model="state.model.slices"
                control-variant="split"
                :min="0"
                variant="outlined"
                label="Rebanadas"
                hide-details="auto"
                class="my-2"
              />
  
              <v-number-input
                v-model="state.model.thrusts"
                control-variant="split"
                :min="0"
                variant="outlined"
                label="Estocadas"
                hide-details="auto"
              />
            </v-col>
  
            <v-divider vertical opacity="30%"/>
  
            <v-col cols="6">
              <v-number-input
                v-model="state.model.timeLimitInSeconds"
                variant="outlined"
                control-variant="split"
                :min="0"
                :step="10"
                label="Tiempo (en segundos)"
                hide-details="auto"
                type="number"
              />
  
              <v-number-input
                v-model="state.model.controls"
                variant="outlined"
                control-variant="split"
                :min="0"
                label="Controles del arma"
                hide-details="auto"
                class="my-2"
              />
  
              <v-number-input
                v-model="state.model.dobleoutLimit"
                control-variant="split"
                :min="0"
                variant="outlined"
                label="Dobleout"
                hide-details="auto"
              />
            </v-col>
  
            <div class="text-subtitle-2 mx-6 text-medium-emphasis">
              Los campos dejado en blanco serán inferidos a partir del 
              <a
                class="text-decoration-none"
                href="#"
                @click="router.push('/score-profiles/base')"
              >
                perfil base.
              </a>
            </div>
          </v-row>
        </v-form>
      </template>

      <template v-slot:actions>
        <v-btn
          color="primary"
          variant="flat"
          @click="createScoreProfile()"
        >
          Crear Perfil
        </v-btn>
      </template>
    </Card>
  </v-dialog>
</template>

<script lang="ts" setup>
import Handler from '@/handlers/Handler';
import ScoreProfile, { ScoreProfileType } from '@/models/ScoreProfile';
import ScoreProfileService from '@/services/ScoreProfileService';
import Rules from '@/services/tools/Rules';
import { useDisplay } from 'vuetify';
import { VForm } from 'vuetify/components';

const emit = defineEmits(['onProfileCreated'])
const router = useRouter()

const state = reactive({
  loading: false,
  dialog: false,
  model: new ScoreProfile(),
  rules: Rules,
})

const form = ref<InstanceType<typeof VForm> | null>(null);

function open() {
  state.dialog = true
}

async function createScoreProfile() {
  if ((await form.value?.validate())?.valid) {
    state.model.type = ScoreProfileType.TEMPLATE
    await Handler.sampleRequest(state, () => ScoreProfileService.postScoreProfile(state.model))
    emit('onProfileCreated')
  }
}

defineExpose({
  open,
})

</script>