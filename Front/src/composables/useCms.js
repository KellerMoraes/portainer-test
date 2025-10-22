import { inject } from 'vue';

export default function useCms() {
  const cms = inject('$cms');
  if (!cms) {
    throw new Error('CMS helper não foi provido. Verifique se está usando o provide("$cms") no App.vue ou componente raiz.');
  }

  return cms;
}