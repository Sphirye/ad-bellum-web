<template>
  <v-card
    border="white md"
    class="mx-auto border-md"
    color="surface-variant"
    max-width="450"
    variant="tonal"
  >
    <v-card-title class="text-white">Overview</v-card-title>

    <v-divider color="white" thickness="2" class="mx-2"/>

  
    <v-card-text>
      <v-row dense justify="center">
          <v-col cols="6">
            <v-card
              color="red-darken-4"
            >
              <v-card-title class="pb-0">Rojo</v-card-title>
              <v-card-subtitle class="text-white">{{match.fencer_1?.name}}</v-card-subtitle>


              <v-divider color="white" thickness="2" class="mx-1"/>


              <v-card-text>
                <v-card-subtitle class="text-white">Dobles: 0</v-card-subtitle>
                <v-card-subtitle class="text-white">Afters: 0</v-card-subtitle>
              </v-card-text>
              
              <v-card-text>
                <v-row justify="space-around">
                  <v-icon icon="mdi-alert-box"/>
                  <v-icon icon="mdi-alert-box"/>
                  <v-icon icon="mdi-alert-box-outline"/>
                  <v-icon icon="mdi-alert-box-outline"/>
                </v-row>
              </v-card-text>

            </v-card>
          </v-col>

          <v-col cols="6">
            <v-card
              color="grey-darken-4"
            >
              <v-card-title class="pb-0">Negro</v-card-title>
              <v-card-subtitle class="text-white">{{match.fencer_2?.name}}</v-card-subtitle>


              <v-divider color="white" thickness="2" class="mx-1"/>

              <v-card-text>
                <v-card-subtitle class="text-white">Dobles: 0</v-card-subtitle>
                <v-card-subtitle class="text-white">Afters: 0</v-card-subtitle>
              </v-card-text>

              <v-card-text>
                <v-row justify="space-around">
                  <v-icon icon="mdi-alert-box-outline"/>
                  <v-icon icon="mdi-alert-box-outline"/>
                  <v-icon icon="mdi-alert-box-outline"/>
                  <v-icon icon="mdi-alert-box-outline"/>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
    </v-card-text>

    <v-card-text>
      <v-time-picker width="auto" class="only-timer">
        <template v-slot:title>
          <div class="d-flex align-center justify-space-between">
            <v-card-subtitle>Tiempo restante</v-card-subtitle>
            <v-btn size="50" class="border-lg" icon="mdi-play"/>
          </div>
        </template>
      </v-time-picker>
    </v-card-text>

    <v-card-actions>
      <v-spacer/>
      <v-btn variant="outlined" @click="toggleDialog()">
        Punto
      </v-btn>
    </v-card-actions>

    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <ScoreMarkingDialog
        :match="match"
        :scores="scores"
      />
    </v-dialog>

  </v-card>
</template>

<script lang="ts">
import Match from '@/models/Match';
import MatchScore from '@/models/MatchScore';


export default defineComponent({
  props: {
    match: { type: Match, required: true },
    scores: { type: Array as PropType<Array<MatchScore>>, required: true },
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    toggleDialog() {
      this.dialog = !this.dialog;
    }
  }
})  
</script>

<style>
.only-timer .v-picker__body {
  display: none;
}
</style>