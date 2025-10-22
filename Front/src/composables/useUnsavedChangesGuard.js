import { watch, onMounted, onBeforeUnmount } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

export function useUnsavedChangesGuard(isDirtyRef, drawerModelRef) {
  // Drawer
  watch(
    () => drawerModelRef.value,
    newVal => {
        alert("teste1")
        if (!newVal && isDirtyRef.value) {
            const confirmed = confirm("Você possui dados alterados. Deseja realmente sair?");
            if (!confirmed) drawerModelRef.value = true;
        }
    }
);

// Navegação
onBeforeRouteLeave((to, from, next) => {
      alert("teste2")
    if (isDirtyRef.value) {
      const confirmed = confirm("Você possui alterações não salvas. Deseja sair?");
      if (!confirmed) return next(false);
    }
    next();
  });

  // Fechar aba
  const handleBeforeUnload = e => {
    if (isDirtyRef.value) {
      e.preventDefault();
      e.returnValue = '';
    }
  };

  onMounted(() => window.addEventListener('beforeunload', handleBeforeUnload));
  onBeforeUnmount(() => window.removeEventListener('beforeunload', handleBeforeUnload));
}