import { defineStore } from 'pinia'
import {ref, onMounted} from "vue";
import { useTheme } from 'vuetify'
import { $cms } from '@/helpers/cmsProviderHelper';
export const useUserConfigStore = defineStore('userConfig',  () => {  
const themeVuetify = useTheme()
const theme = ref('light')  
const sidebarTransparency = ref(false)
const configBarSize = ref(25)
const quickAcessBarSize = ref(20)
const autoSave = ref(true)
const clipboard = ref(null)
const quickAcessElements = ref([{
            [$cms("name")]: "Linha",
            [$cms("id")]: "linha-",
            [$cms("icon")]: 'mdi-view-sequential',
        }])
const sidebarButtonsView = ref('icon')
function changeTheme(themeValue){
    themeVuetify.change(themeValue)
    theme.value = themeValue
}
function changeSbTransparency(value){
    sidebarTransparency.value = value
}
function changeSbButtonsView(value){
    sidebarButtonsView.value = value
}
return { theme, sidebarTransparency ,sidebarButtonsView, configBarSize,quickAcessBarSize,quickAcessElements, clipboard,autoSave, changeTheme, changeSbTransparency, changeSbButtonsView}
}, {persist: true})