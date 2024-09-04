<template>
  <v-card
    border="white md"
    class="mx-auto border-md"
    color="surface-variant"
    max-width="344"
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
              <v-card-title>Rojo</v-card-title>

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
              <v-card-title>Negro</v-card-title>

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
      <ScoreMarkingDialog/>
    </v-dialog>

  </v-card>
</template>

<script lang="ts" setup>
  const dialog = ref<boolean>(false);
  
  const toggleDialog = () => {
    dialog.value = !dialog.value;
  };
</script>

<style>
.only-timer .v-picker__body {
  display: none;
}
</style>