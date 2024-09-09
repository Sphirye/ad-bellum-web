<template>
  <v-card flat>

    <v-card-title>Resumen</v-card-title>

    <v-card-text>
      <v-row align="center" dense>

        <v-col cols="6">
          <v-card
            color="rgba(189,69,69,255)"
          >
            <template v-slot:title>
              <div class="d-flex justify-space-between">
                <div class="d-flex">
                  <div class="d-flex flex-column">
                    <span class="text-h6 font-weight-bold">Rojo</span>
                    <span class="text-subtitle-2 text-medium-emphasis">Juan Rafael</span>
                  </div>
                </div>

                7 pts
              </div>
            </template>

            <v-card-item>
              <template v-slot:subtitle>
                <v-icon
                  class="me-1 pb-1"
                  icon="mdi-alert"
                  size="18"
                />
        
                Penalizaciones: 5
              </template>
            </v-card-item>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card
            color="#494949"
          >
            <template v-slot:title>
              <div class="d-flex justify-space-between">
                <div class="d-flex">
                  <div class="d-flex flex-column">
                    <span class="text-h6 font-weight-bold">Negro</span>
                    <span class="text-subtitle-2 text-medium-emphasis">Carlos Antonio</span>
                  </div>
                </div>

                4 pts
              </div>
            </template>

            <v-card-item>
              <template v-slot:subtitle>
                <v-icon
                  class="me-1 pb-1"
                  icon="mdi-alert"
                  size="18"
                />
                Penalizaciones: 1
              </template>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>

    
  </v-card>
</template>