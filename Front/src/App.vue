<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserConfigStore } from './stores/userConfigs'
const route = useRoute()
const userStore = useUserConfigStore()
onMounted(()=>{
  userStore.changeTheme(userStore.theme)
 
})
// Escolhe o layout com base na rota
const layout = computed(() => {
  // você pode fazer qualquer lógica aqui
  // Exemplo: se o path começar com /editor → usa EditorLayout
  if (route.path.startsWith('/editor')) {
    return resolveComponent('EditorLayout')
  }
  return resolveComponent('DefaultLayout')
})
</script>