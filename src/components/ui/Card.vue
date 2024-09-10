<template>
  <v-card variant="flat" border="opacity-25 md">
      <v-card-title>
        <v-sheet color="#BD4545" class="py-3 px-5 my-2">
          <v-row no-gutters align="center">
            <slot name="title"/>
          </v-row>
        </v-sheet>
      </v-card-title>

      <v-card-text>
        <slot name="text"/>
      </v-card-text>
  </v-card>
</template>