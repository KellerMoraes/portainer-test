<template>
    <v-navigation-drawer scrim="black" width="500" location="right" temporary="" v-model="drawer">
        <v-sheet>
            <v-overlay v-model="dontClose" class="align-center" scrim="black" opacity="0.8" contained>
                <v-container class="d-flex justify-center align-center">
                    <v-card width="75%">
                        <v-card-title>Atenção</v-card-title>
                        <v-card-text>
                            Alterações foram feitas, se fechar, as mesmas serão perdidas, deseja continuar?
                        </v-card-text>
                        <v-card-actions class="justify-end">
                            <v-btn color="error" @click="managementStore.rightNavDisplay = false">
                                Sim
                            </v-btn>
                            <v-btn color="success" variant="flat" @click="dontClose = false">
                                Não
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-container>
            </v-overlay>
            <v-card tile color="blue" height="100%" class="pt-2">
                <v-card-title style="background-color: white; color: black; font-size: 30px; font-weight: 500;">
                    <v-icon>mdi-file-document-outline</v-icon><span>
                        Editar página
                    </span>
                </v-card-title>
            </v-card>
            <v-container>

                <div class="my-2 required">Nome</div>
                <!-- NOME E CAMINHO -->
                <v-text-field v-model="Pagina[$cms('name')]" hide-details variant="outlined"
                    density="compact"></v-text-field>

                <div class="my-2">URL:</div>
                <v-text-field readonly v-model="url" variant="outlined" density="compact">
                    <template v-slot:append>
                        <v-btn height="100%" variant="tonal" style="margin-left: -10px;">
                            <v-icon>mdi-content-copy</v-icon>
                        </v-btn>
                    </template>
                </v-text-field>
                <!-- NOME E CAMINHO -->
                <!-- Datas -->
                <v-row>
                    <v-col cols="6">
                        <span class="my-2 required">Data inicial</span>
                        <ManagementResourcesDatePicker v-model="Pagina[$cms('startsAt')]">
                        </ManagementResourcesDatePicker>
                    </v-col>
                    <v-col cols="6">
                        <span class="my-2">Horário Inicial:</span>
                        <ManagementResourcesTimePicker v-model="Pagina[$cms('startsAt')]">
                        </ManagementResourcesTimePicker>
                    </v-col>
                </v-row>
                <v-divider class="my-5"></v-divider>
                <v-row>
                    <v-col cols="6">
                        <span class="my-2">Data Final:</span>
                        <ManagementResourcesDatePicker v-model="Pagina[$cms('endsAt')]"></ManagementResourcesDatePicker>
                    </v-col>
                    <v-col cols="6">
                        <span class="my-2">Horário Final:</span>
                        <ManagementResourcesTimePicker v-model="Pagina[$cms('endsAt')]"></ManagementResourcesTimePicker>
                    </v-col>
                </v-row>
                <v-card-actions class="d-flex justify-end mt-10 mr-4">
                    <v-btn variant="flat" @click="alter()"
                        color="success">Alterar</v-btn>
                </v-card-actions>
            </v-container>



        </v-sheet>
    </v-navigation-drawer>

</template>
<script setup>
import { useManagementStore } from "@/stores/management";
import { $cms } from "@/helpers/cmsProviderHelper";
import {PaginaUpdateRequest } from "@/model/Requests/PaginaUpdateRequest";
import _pagina from "@/services/paginas";
const managementStore = useManagementStore();

let Data = managementStore.editDialogData;
const Pagina = ref(new PaginaUpdateRequest(Data[$cms("id")],Data[$cms("name")], Data[$cms("path")], null, Data[$cms("startsAt")], Data[$cms("endsAt")], Data[$cms("published")], Data[$cms("type")], Data[$cms("configs")], Data[$cms("alteredAt")], Data[$cms("excludedAt")]));
const alterationsFlag = ref(false);
const dontClose = ref(false);
onMounted(() => {
    console.log(Pagina.value);
});
onUnmounted(() => {
    managementStore.editDialogData = null;
    managementStore.editDialogDisplay = null;
});
const drawer = computed({
    get() {
        // Retorna true ou false baseado na flag
        return !alterationsFlag.value ? true : managementStore.rightNavDisplay;
    },
    set(value) {
        // Só permite fechar se não houver alterações
        if (value === false && alterationsFlag.value) {
            // Impede o fechamento
            dontClose.value = true;
            return;
        }
        // Atualiza o v-model da store normalmente
        managementStore.rightNavDisplay = value;
    }
});
function alter(){
    // console.log(Pagina.value)
     _pagina.alterar(Pagina.value).then(()=>{managementStore.refreshList()}).finally(()=>{ alterationsFlag.value=false})
     
}
// function closeDrawer(){
//     console.log("AAAAA")
//     if(alterationsFlag.value){
//         dontClose.value = true
//         managementStore.rightNavDisplay = true
//         return
//     }
//     managementStore.rightNavDisplay = false
// }
watch(
    () => Pagina.value, newVal => {
        if (newVal) {
            alterationsFlag.value = true;
        }
    }, { deep: true }
);
// ==========================
// MODELS SEPARADOS
// ==========================


// ==========================
// UNIFICAÇÃO AUTOMÁTICA
// ==========================

// ==========================
// URL AUTOMÁTICA
// ==========================
const url = computed(() => {
    console.log(!Pagina.value[$cms("name")]);
    if (!Pagina.value[$cms("name")]) return "";
    let url = Pagina.value[$cms("name")]
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trimEnd()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    Pagina.value[$cms("path")] = url;
    return url;
});


// ==========================
// BREADCRUMBS
// ==========================

function nextbtn(func) {
    console.log(dataInicial.value);
    console.log(dataInicial.value);
    let inicial = combinarDataHora(dataInicial.value, horaInicial.value);
    let final = combinarDataHora(dataFinal.value, horaFinal.value) ?? null;
    console.log(final);
    console.log(inicial);
    Pagina[$cms("startsAt")] = inicial;
    Pagina[$cms("endsAt")] = final;
    func();
}
</script>

<style scoped lang="scss">
.v-navigation-drawer__scrim {
    opacity: 0.4 !important;
}
</style>