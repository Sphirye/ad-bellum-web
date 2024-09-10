<template>
  <v-card variant="flat" border="opacity-25 md">
      <v-card-title>
        <v-sheet color="grey-darken-1" class="py-3 px-3 my-2">
          <v-row no-gutters align="center">
            <slot name="title"/>
          </v-row>
        </v-sheet>
      </v-card-title>

      <v-divider opacity="25" class="mx-9"/>

      <v-card-text>
        <slot name="text"/>
      </v-card-text>
  </v-card>
</template>