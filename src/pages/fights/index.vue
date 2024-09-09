<template>
    <v-container fluid>
      <v-card
        title="Historial de Sparrings"
        flat
      >
        <template v-slot:text>
          <v-text-field
          label="Buscar"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
        />
        </template>
  
        <SparringHistoryTable/>
  
      </v-card>
    </v-container>
  </template>