<template>
  
        <v-card class="pa-4"  flat style="overflow: auto; margin-top: 68px;">
          <v-card-title >
            Aparência
            <br>
            <div style="font-size: 13px; font-weight: 300;">Mude as configurações de visualização do sistema.</div>

          </v-card-title>
            <v-divider class="ma-4 mb-8"></v-divider>
            <ResourceTheme></ResourceTheme>
            <v-divider class="ma-4"></v-divider>
            <ResourceSideBar></ResourceSideBar>
      </v-card>
  
  
  
  </template>
  <script setup>
import ResourceSideBar from './Resources/resourceSideBar.vue';
import ResourceTheme from './Resources/resourceTheme.vue';

  
  </script>
  <style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
  .selecionavelHover {
      transition: opacity .4s ease-in-out;
    }
  
    .selecionavelHover:not(.on-hover) {
      opacity: 0.4;
    }
  
    .show-btns {
      color: rgba(255, 255, 255, 1) !important;
    }
  </style>
  