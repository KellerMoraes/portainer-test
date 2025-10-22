<template>
    <v-navigation-drawer crim="black" width="500" location="right" temporary="" v-model="drawer">
        <v-sheet>
            <v-overlay v-model="dontClose" class="align-center" width="100%" scrim="black" opacity="0.8" contained>
                <v-container class="d-flex justify-center">
                    <v-card width="75%">
                        <v-card-title>Atenção</v-card-title>
                        <v-card-text>
                            Os dados serão perdidos, deseja continuar?
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
            <v-card tile :color="managementStore.createDialogData.color" height="100%" class="pt-2">
                <v-card-title style="background-color: white; color: black; font-size: 30px; font-weight: 500;">
                    <v-icon>{{ managementStore.createDialogData.icon }}</v-icon><span>
                        Criar {{ managementStore.createDialogData.singleName }}
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
                    <v-btn :disabled="validacaoCriacao" variant="flat" @click="criarPagina()"
                        color="success">Criar</v-btn>
                </v-card-actions>
            </v-container>
        </v-sheet>
    </v-navigation-drawer>

</template>

<script setup>
import { useManagementStore } from "@/stores/management";
import { $cms } from "@/helpers/cmsProviderHelper";
import { PaginaRequest } from "@/model/Requests/PaginaRequest";
import _pagina from "@/services/paginas";
import { criarElemento } from "@/model/Elementos";
const managementStore = useManagementStore();
const Pagina = ref(new PaginaRequest('', '', {}, '', null, false, '', {}))
const alterationsFlag = ref(false);
const dontClose = ref(false);
onMounted(() => {
    console.log(Pagina.value);
});
onUnmounted(() => {
    console.log("teste")
    managementStore.createDialogData = null;
    managementStore.createDialogDisplay = null
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
const validacaoCriacao = computed(() => {
    return (Pagina.value[$cms('name')]?.length < 5 && !Pagina.value[$cms('startsAt')])
})
function criarPagina() {
    Pagina.value[$cms('type')] = managementStore.createDialogData.tipoPagina
    let paginaModel = criarElemento("Pagina", { [$cms('meta')]: {} })
    Pagina.value[$cms('content')] = paginaModel[$cms('content')]
    Pagina.value[$cms('configs')] = paginaModel[$cms('configs')]
    // console.log(Pagina)
    _pagina.criar(Pagina.value).then((response)=>{
        console.log(response)
        managementStore.editDialogDisplay = true
        managementStore.editDialogData = response
        managementStore.createDialogDisplay = null
        managementStore.createDialogData = null
        managementStore.refreshList()
    })
}
</script>
<style lang="scss">
.required {
    &::after {
        content: " *";
        color: red;
    }
}

.v-navigation-drawer__scrim {
    opacity: 0.4 !important;
}
</style>