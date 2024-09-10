<template>
    <v-container fluid>
      <v-card
        title="Historial de Combates"
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
  
        <MatchesHistoryTable/>
  
      </v-card>
    </v-container>
  </template>