import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useManagementStore = defineStore('management', () => {
  const warningData = ref(null)
  const warningDisplay = ref(false)
  const rightNavDisplay = ref(false)
  const rightNavData = ref(null)
  const createDialogDisplay = ref(null)
  const createDialogData = ref(null)
  const editDialogDisplay = ref(null)
  const editDialogData = ref(null)
  const refreshFunction = ref(null)
  function refreshList(){
    if(refreshFunction.value){
      refreshFunction.value()
    }
  }

  return {refreshFunction, refreshList, warningData , warningDisplay,rightNavDisplay,rightNavData,createDialogDisplay,createDialogData,editDialogDisplay,editDialogData};
});
