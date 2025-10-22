<template>
  <ManagementSectionsCreateDialog v-if="managementStore.createDialogDisplay" />
  <ManagementSectionsEditDialog v-if="managementStore.editDialogDisplay" />

</template>
<script setup>
import { useManagementStore } from '@/stores/management';

const managementStore = useManagementStore()

</script>

<style scoped lang="scss">
.v-navigation-drawer__scrim {
  opacity: 0.4 !important;
}
</style>