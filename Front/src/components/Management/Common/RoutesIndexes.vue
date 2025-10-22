<template>
<v-container  fluid
  class="d-flex flex-column fill-height pa-4 pt-6" style="align-items: normal;">
  <ManagementSectionsTopNav :settings="settings" />
  <ManagementContainmentItensContainer @refresh="refreshList" class="flex-grow-1" :data="pages"/>
  </v-container>
</template>
<script setup>
const props = defineProps(['pages', 'settings'])
const emit = defineEmits(['refreshList'])
function refreshList(){
  emit("refreshList")
}
</script>