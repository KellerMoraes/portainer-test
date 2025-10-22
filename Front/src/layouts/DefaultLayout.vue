<template>
  <v-app>
    <ManagementSectionsRightNav v-if="managementStore.rightNavDisplay"></ManagementSectionsRightNav>

    <v-navigation-drawer
      permanent
      floating
      color="surface"
      width="240"
      class="elevation-0"
    >
    <ManagementSectionsSideNav></ManagementSectionsSideNav>
    </v-navigation-drawer>
    
    <v-main class="d-flex flex-column fill-height">
      <!-- <v-container fluid class="pa-4"> -->
        <slot />
      <!-- </v-container> -->
    </v-main>
  </v-app>
</template>
<script setup>
import { useManagementStore } from '@/stores/management';
const managementStore = useManagementStore()


</script>