<template>
    <div>
        <v-row>
            <v-col cols="8">
                <h5 class="tituloConfig ml-2" :class="{ disabled: checkConfigMark('textStyleKit') }">Fonte
                </h5>
                <v-select variant="outlined" @update:modelValue="onFontChange" :items="fontFamilyList"
                    v-model="fontFamily" density="comfortable" item-title="name"
  return-object  :disabled="checkConfigMark('textStyleKit')" hide-details>
                    <template v-slot:item="{ props, item }">
                        <v-list-item v-bind="props" :title="null">
                            <v-list-item-title :style="{ fontFamily: item.raw.name }">{{ item.raw.name
                                }}</v-list-item-title>
                        </v-list-item>
                    </template>
                </v-select>
            </v-col>
            <v-col cols="4">
                <h5 class="tituloConfig ml-2" :class="{ disabled: checkConfigMark('fontWeight') }">Peso
                </h5>
                <v-select variant="outlined" :items="fontWeightList" @update:modelValue="onWeightChange"
                    v-model="fontWeight" density="comfortable" :disabled="checkConfigMark('fontWeight')" hide-details>
                </v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <h5 class="tituloConfig ml-2" :class="{ disabled: checkConfigMark('textStyleKit') }">Tamanho da
                    fonte
                </h5>
                <v-slider v-model="fontSize" @update:model-value="onFontSizeChange" :max="72" :min="10" :step="1"
                 :disabled="checkConfigMark('textStyleKit')" hide-details>
                    <template v-slot:append>
                        <v-text-field v-model="fontSize"  @update:model-value="onFontSizeChange" :max="72" :min="10" density="compact" style="width: 80px"
                            type="number" variant="outlined" hide-details></v-text-field>
                    </template>
                </v-slider>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <h5 class="tituloConfig ml-2" :class="{ disabled: checkConfigMark('bold', 'italic') }">
                    Estilo
                </h5>
                <v-btn-toggle variant="outlined" selected-class="btnAtivo" multiple v-model="textStyles">
                    <v-btn v-for="btn in styleBtns" :readonly="btn.value == 'regular' ? true :false" :disabled="disabledCondition(btn.value)" :icon="btn.icon"
                        @click="btn.toggle()" :value="btn.value"></v-btn>
                </v-btn-toggle>
            </v-col>
        </v-row>
        <v-divider class="ma-6 mx-2"></v-divider>
    </div>

</template>
<script setup>
import { useEditorWatcher } from "@/composables/useEditorWatch"

const props = defineProps(['config', 'disabled'])
const fontFamily = ref(null)
const fontWeight = ref(400)
const fontWeightList = ref([])
const fontSize = ref(10)
const textStyles = ref([])

const styleBtns = reactive([
    { icon: "mdi-format-text", name: "Light", value: "thin", toggle: () => editorRef.value?.chain().focus().unsetBold().toggleFontWeight(100).run() },
    { icon: "mdi-format-bold", name: "Negrito", value: "bold", toggle: () => editorRef.value?.chain().focus().unsetFontWeight().toggleBold().run() },
    { icon: "mdi-format-color-text", name: "Normal", value: "regular" },
    { icon: "mdi-format-italic", name: "Itálico", value: "italic", toggle: () => editorRef.value?.chain().focus().toggleItalic().run() },
])
const fontFamilyList = [
    { name: "Roboto", weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
    { name: "Staatliches", weights: [400] },
    { name: "Open Sans", weights: [300, 400, 500, 600, 700, 800, 900] },
    { name: "Inter", weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
]
const { editorRef } = useEditorWatcher(checkStyleMarks)

function checkStyleMarks(editor) {
  const styles = []

  const style = editor.getAttributes("textStyle")
  const weight = editor.getAttributes("fontWeight")?.weight

  // Mapeamento declarativo de marks simples
  const rules = [
    { check: () => editor.isActive("bold"), value: "bold" },
    { check: () => editor.isActive("italic"), value: "italic" },
    { check: () => editor.isActive("underline"), value: "underline" },
    { check: () => !editor.isActive("bold") && fontWeight.value === 400, value: "regular" },
    { check: () => weight === 100, value: "thin" },
  ]

  styles.push(...rules.filter(r => r.check()).map(r => r.value))

  // Sincronizar weight
//   if (weight && fontWeight.value !== weight) {
//       fontWeight.value = weight
//     }
  if (weight && fontWeight.value !== weight) {
      fontWeight.value = weight
    }
    else{
        fontWeight.value = 400
    }
    
    // Font family
    if (style?.fontFamily) {
        fontFamily.value = style.fontFamily
        const found = fontFamilyList.find(font => font.name === style.fontFamily)
        fontWeightList.value = found?.weights ?? []
    }
  // Font size
  if (style?.fontSize) {
    const number = style.fontSize.match(/\d+/)?.[0]
    fontSize.value = number ? parseInt(number) : fontSize.value
  }

  textStyles.value = styles
}

function checkConfigMark(...marks) {
    if(props.disabled){return true}
    return !props.config?.some(e => marks.includes(e))
}
function onFontChange(value) {
    editorRef.value.chain().focus().setFontFamily(value.name).run()
    fontWeightList.value = value.weights
}
function onFontSizeChange(value) {
    if(value <= 10){
        editorRef.value.chain().focus().setFontSize(10 + 'px').run()
        return
    }
    if(value >= 72){
        editorRef.value.chain().focus().setFontSize(72 + 'px').run()
        return
    }
    editorRef.value.chain().focus().setFontSize(value + 'px').run()
}
function onWeightChange(value) {
    editorRef.value.chain().focus().unsetBold().setFontWeight(value).run()
}
function disabledCondition(value) {
    if(props.disabled){return true}
    if (value == 'thin' && fontWeightList.value.length < 3) {
        return true
    }
}
</script>
