<template>
  <v-dialog v-model="dialogImportar" max-width="600px">
    <template v-slot:activator="{ props }">
      <v-btn color="blue" variant="flat" class="mx-1" v-bind="props">
        {{ propsNome }} <v-icon>mdi-plus</v-icon>
      </v-btn>
      
    </template>




    <!-- O QUE IRÁ ABRIR... -->

    <v-card color="blue" height="600px" border-radius="6px" class="pt-3 ma-1 border-radius-2">
      <v-card-title class="pt-4"
        style="background-color: white; color: black; font-size: 30px; font-weight: 500; font-family: var(--fonte-titulos2);">
        <v-avatar class="mr-2" size="70" color="blue"><v-icon size="50">mdi-school</v-icon></v-avatar>
        Criar nova página
        <v-divider class="mx-1 mt-5"></v-divider>
      </v-card-title>

      <v-stepper v-model="stepper" flat tile :items="['Início', 'Layout', 'Meta']" height="100%">
        <template v-slot:item.1>
          <!-- <v-card-text style="background-color: white; color: black; font-weight: 300; font-family: var(--fonte-titulos);"> -->
          <!-- NOME -->
          <div class="my-2">Nome:</div>
          <v-text-field v-model="campoNome" hide-details variant="outlined" density="compact"></v-text-field>
          <!-- NOME -->
          <!-- URL -->
          <div class="my-2">URL:</div>
          <v-text-field readonly variant="outlined" density="compact">
            <template v-slot:append>
              <v-btn height="100%" variant="tonal" style="margin-left: -10px;"><v-icon>mdi-content-copy</v-icon></v-btn>
            </template>
          </v-text-field>
          <!-- URL -->
          <!-- Datas -->
          <v-row>
            <v-col cols="6">

              <span class="my-2">Inicial:</span>
              <v-menu v-model="menuInicial" :close-on-content-click="false" location="end">
                <template v-slot:activator="{ props }">
                  <v-text-field :rules="rulesDate" width="200px" v-maska="'##/##/####'" @input="onInput('i', $event)"
                    v-model="dataInputInicial" v-bind="props" variant="outlined" hide-messages density="compact">
                  </v-text-field>
                </template>

                <v-card min-width="300">
                  <v-locale-provider locale="pt">
                    <v-date-picker v-model="dataDatePickerInicial" @update:model-value="onDatePick('i', $event)"
                      elevation="0" color="primary"></v-date-picker>
                  </v-locale-provider>
                </v-card>
              </v-menu>
            </v-col>
            <v-col cols="6">

              <span class="my-2">Final:</span>
              <v-menu v-model="menuFinal" :close-on-content-click="false" location="end">
                <template v-slot:activator="{ props }">
                  <v-text-field width="200px" v-maska="'##/##/####'" @input="onInput('f', $event)"
                    v-model="dataInputFinal" v-bind="props" variant="outlined" hide-messages density="compact">
                  </v-text-field>
                </template>

                <v-card min-width="300">
                  <v-locale-provider locale="pt">
                    <v-date-picker v-model="dataDatePickerFinal" :min="dataDia"
                      @update:model-value="onDatePick('f', $event)" elevation="0" color="primary"></v-date-picker>
                  </v-locale-provider>
                </v-card>
              </v-menu>
            </v-col>
          </v-row>

          <!-- Datas -->

          <!-- URL -->
        </template>

        <template v-slot:item.2>
          <v-card title="Step Two" flat>...</v-card>
        </template>

        <template v-slot:item.3>
          <v-card title="Step Three" flat>...</v-card>
        </template>
        <template v-slot:actions="{prev,next}">
          <v-btn v-if="stepper > 1" @click="prev" class="ml-6 mt-5" variant="plain"><v-icon>mdi-arrow-left</v-icon>Voltar</v-btn>
          <v-btn v-if="stepper < 3" :disabled="validacaoInicio" @click="next" style="position: absolute; right: 0;" color="blue" variant="flat" class="mr-6 mt-5">Próximo<v-icon>mdi-arrow-right</v-icon></v-btn>
          <v-btn v-if="stepper == 3" @click="next" style="position: absolute; right: 0;" class="mr-6 mt-5" variant="text" color="primary">Pular</v-btn>
        </template>
        
      </v-stepper>

      <!-- <v-card-actions style="background-color: white;">
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="dialogImportar = false">
                  <v-icon>mdi-arrow-left</v-icon> voltar
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="confirmarImportacao">
                  próximo <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
              </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>
<script setup>
import { format, parse } from 'date-fns'
import { vMaska } from "maska/vue"

const dialogImportar = ref(false)

const dataDatePickerInicial = ref(null)
const dataDia = parse(format(new Date(), 'dd/MM/yyyy'), 'dd/MM/yyyy', new Date())
const dataInputInicial = ref(format(new Date(), 'dd/MM/yyyy'))
const dataDatePickerFinal = ref(null)
const dataInputFinal = ref('')
const campoNome = ref(null)
const stepper = ref(null)
const rulesNome = [
    value => {
      if (value.length > 5){
        if(verificarDuplicidade(value)){

        }
      } 
      return 'Insira uma data válida!'
    },
  ]
const rulesDate = [
    value => {
      if (isValidDateRange(value)) return true
      return 'Insira uma data válida!'
    },
  ]
const paginaImportadaCarregada = ref(true)
const menuInicial = ref(false)
const menuFinal = ref(false)
const props = defineProps(['tipo', 'propsNome'])
const emit = defineEmits(['paginaRetorno'])

function confirmarImportacao() {
  console.log("ceta")
}
watch(dataDatePickerInicial, (newVal) => {
  dataInputInicial.value = newVal ? format(new Date(newVal), 'dd/MM/yyyy') : ''
})
watch(dataDatePickerFinal, (newVal) => {
  dataInputFinal.value = newVal ? format(new Date(newVal), 'dd/MM/yyyy') : ''
})
function mostrarArquivoSelecionado(event) {
  const arquivo = event.target.files[0];
  if (arquivo) {
    console.log("Arquivo selecionado:", arquivo);
  }
}
function onDatePick(op, val) {
  if (op == 'i') {
    dataDatePickerInicial.value = val
    menuInicial.value = false
  }
  else {
    dataDatePickerFinal.value = val
    menuFinal.value = false

  }
}

function onInput(op, val) {
  console.log(val)
  if (val.srcElement.value.length > 9 && isValidDateRange(val.srcElement.value)) {
    if (op == 'i') {
      dataDatePickerInicial.value = parse(val.srcElement.value, 'dd/MM/yyyy', new Date())
    }
    else {
      dataDatePickerFinal.value = parse(val.srcElement.value, 'dd/MM/yyyy', new Date())

    }
  }
}
const validacaoInicio = computed(() => {
  if(campoNome?.value?.length > 5 && isValidDateRange(dataInputInicial.value)){
    return false
  }
  return true
})
function isValidDateRange(dateStr) {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/20[0-9]{2}$/;
  if (!regex.test(dateStr)) {
    console.log("Regex falhou!");
    return false;
  }

  const [day, month, year] = dateStr.split('/').map(Number);

  // Aqui você confere o que realmente foi extraído
  console.log("Valores extraídos:", { day, month, year });

  // Cuidado: JS usa mês base 0 (jan=0, dez=11)
  const date = new Date(year, month - 1, day);

  console.log("Objeto Date gerado:", date);

  if (
    date.getDate() !== day ||
    (date.getMonth() + 1) !== month ||
    date.getFullYear() !== year
  ) {
    console.log("Data inválida real:", date);
    return false;
  }

  const min = new Date(2000, 0, 1); // 01/01/2000
  const max = new Date(2099, 0, 1); // 01/01/2099

  return date >= min && date <= max;
}
function verificarDuplicidade(nomePagina){
return true
}
</script>