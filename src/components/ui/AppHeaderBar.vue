<template>
  <v-app-bar class="border-b" elevation="0" temporary>
    <template v-slot:prepend>
       <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
    </template>
    <v-app-bar-title class="ml-3">
      <div class="custom-borderline pointer">
        <div
         class="text-h6 ml-1 blackmoor-text"
          style="line-height: 20px !important;"
        >
          Ad
        </div>
        <div
            class="text-h5 blackmoor-text"
            style="line-height: 25px !important;"
        >
          Bellum
        </div>
      </div>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script lang="ts" setup>
  const drawer = defineModel({required: true, type: Boolean})
</script>

<style>
@font-face {
  font-family: 'Blackmoor Std';
  src: url("../../assets/fonts/BlackmoorStdRegular.otf") format("opentype");
}

.blackmoor-text {
  font-family: 'Blackmoor Std', 'Work Sans', sans-serif;
}

.custom-borderline {
  /* you can change these variables to control the border */
  --border-color: #b71c1c;
  --border-width: 4px;
  --bottom-distance: 0px; /* you can increase this */
  background-position: 50% calc(100% - var(--bottom-distance));
  display: inline-block;
  background-image: linear-gradient(var(--border-color), var(--border-color));
  background-size: 0% var(--border-width);
  background-repeat: no-repeat;
  transition: background-size 0.3s;
}

.custom-borderline:hover {
  cursor: pointer;
  background-size: 100% var(--border-width);
}
</style>